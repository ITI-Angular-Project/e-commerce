import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
   showPw = false;
  constructor(private fb: FormBuilder
    , private authService: AuthService
    , private router: Router
  ) {

   }

 ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

onSubmit(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login successful:', res);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Login failed:', err);
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}

