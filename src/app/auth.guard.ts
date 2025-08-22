import { CanActivateFn } from '@angular/router';

import { AuthService } from './springboot-api-services/auth.service';
import { inject } from '@angular/core';

// Remove the constructor from here; it's not needed in a function-based guard.
// Instead, inject AuthService using a provider function.

import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService && authService.isLoggedIn()) {
    return true;
  }
  else{
      router.navigate(['/login/register']);
      return false;
  }

};


