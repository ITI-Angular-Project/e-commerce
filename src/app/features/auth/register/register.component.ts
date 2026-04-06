import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  showPw  = false;
  showPw2 = false;
 
  registerForm: FormGroup;
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms:      [false, Validators.requiredTrue],
      newsletter:      [true]
    });
  }
 
  onSubmit(): void {
    if (this.registerForm.valid) {
      const {firstName, lastName, email, password} = this.registerForm.value;
      const username = `${firstName}.${lastName}`;
      this.authService.register(username, password, email).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error); 
        }
      });

    }
  }
}


