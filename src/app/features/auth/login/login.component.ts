import { Component, OnInit } from '@angular/core';
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
  errorMessage = ''; // holds the server error text
  isLoading = false; // prevents double-submit
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.authService.login(email, password).subscribe({
  //       next: (res: any) => {
  //         console.log('Login successful:', res);
  //         this.router.navigate(['/home']);
  //       },
  //       error: (err: any) => {
  //         console.error('Login failed:', err);
  //       },
  //     });
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }
  onSubmit(): void {
    this.errorMessage = ''; // clear previous error on each attempt

    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          this.isLoading = false;
          // Map HTTP status codes to user-friendly messages
          if (err.status === 400) {
            this.errorMessage = 'Invalid email or password.';
          } else if (err.status === 0) {
            this.errorMessage = 'Cannot reach the server. Check your connection.';
          } else {
            this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
