import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/users';
  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, password: string, email: string): Observable<any> {
    const body = { username, password, email };
    return this.http.post(this.apiUrl, body);
  }
}
