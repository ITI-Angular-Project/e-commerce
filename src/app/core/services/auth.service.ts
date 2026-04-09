import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../Models/user/register';
import { User } from '../Models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(), // rehydrate on page refresh
  );
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      }),
      map((res) => res.user),
    );
  }

  register(username: string, email: string, password: string): Observable<Register> {
    const body = { username, email, password };
    return this.http.post<any>('http://localhost:3000/register', body).pipe(
      tap((res) => {
        // this.token = res.token;
        // this.currentUserSubject.next(res.user);

        // optional persistence
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
      }),
      map((res) => res.user),
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<Register[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
