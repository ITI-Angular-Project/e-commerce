import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      map((users) => {
        const user = users.find((u) => {
          return u.email.trim() === email.trim() && u.password.trim() === password.trim();
        });

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        } else {
          throw new Error('wrong email or password');
        }
      }),
    );
  }

  register(username: string, email: string, password: string): Observable<User> {
    const body = { username, email, password };
    return this.http.post<User>('http://localhost:3000/users', body);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<User[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }
}
