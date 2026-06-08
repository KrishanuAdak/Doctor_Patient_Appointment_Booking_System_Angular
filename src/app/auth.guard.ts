import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './springboot-api-services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(() => {
      authService.setLoggedIn(true);   // keep local state in sync
      return true;
    }),
    catchError(() => {
      authService.setLoggedIn(false);
      router.navigate(['/login/register']);
      return of(false);
    })
  );
};