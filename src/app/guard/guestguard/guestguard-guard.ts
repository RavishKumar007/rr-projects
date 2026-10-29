import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/authservice/auth';
import { isPlatformBrowser } from '@angular/common';

export const guestguardGuard: CanActivateFn = (route, state) => {

  const authservice = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

    // Let the browser check localStorage.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

    // Already logged in according to the UI state?
  if (authservice.isLoggedIn()) {
    return router.createUrlTree(['/admin']);
  }
  
  return true;
};
