import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthActionService {
  private auth = inject(AuthService);
  private router = inject(Router);

  requireAuth(action: () => void): void {
    if (this.auth.isLoggedIn()) {
      action();
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url },
      });
    }
  }
}
