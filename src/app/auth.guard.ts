import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './springboot-api-services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        console.log('User is authenticated, allowing access to route:', state.url);
        return true;
      }

      router.navigate(['/login/register']);
      console.log('User is not authenticated, redirecting to login/register');
      return false;
    }),
    catchError(() => {
      router.navigate(['/login/register']);
      console.log('Error occurred while checking authentication, redirecting to login/register');
      return of(false);
    })
  );
};