import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const fromRedirect = router.currentNavigation()?.extras.state?.['fromRedirect'];

  if (fromRedirect) {
    console.log('hii');

    return true;
  }
  return false;
};
