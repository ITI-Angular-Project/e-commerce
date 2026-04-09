import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password }).pipe(
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

  register(username: string, email: string, password: string): Observable<User> {
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
      .get<User[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
