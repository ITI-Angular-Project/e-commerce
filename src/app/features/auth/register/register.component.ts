import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showPw = false;
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get agreeTerms() {
    return this.registerForm.get('agreeTerms');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreeTerms: [false, Validators.requiredTrue],
      newsletter: [true],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      const username = `${firstName}.${lastName}`;

      this.authService.checkEmailExists(email).subscribe((exists) => {
        if (exists) {
          alert('Email already exists. Please use a different email.');
          this.router.navigate(['/auth/login']);
        } else {
          this.authService.register(username, email, password).subscribe({
            next: (response) => {
              console.log('Registration successful:', response);
              this.router.navigate(['/auth/login']);
            },
            error: (error) => {
              console.error('Registration failed:', error);
            },
          });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  onSubmit2(): void {
    this.errorMessage = '';

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;
    const username = `${firstName}.${lastName}`;
    this.isLoading = true;

    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (exists) {
          this.isLoading = false;
          // Set the error directly on the email control
          this.email?.setErrors({ emailTaken: true });
          return;
        }

        this.authService.register(username, email, password).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            this.isLoading = false;
            if (err.status === 409) {
              this.email?.setErrors({ emailTaken: true });
            } else if (err.status === 0) {
              this.errorMessage = 'Cannot reach the server. Check your connection.';
            } else {
              this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
            }
          },
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Could not verify email. Please try again.';
      },
    });
  }
}
