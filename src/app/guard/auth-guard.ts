import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/authservice/auth';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(Auth);
  const router = inject(Router);
    // Let the browser perform the authentication check.
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return true;
  }

  if(!!authservice.isLoggedIn()){
    console.log("is logged in t")
    return true;
  } else {  console.log("is logged in f")
    router.navigate(['/admin/login']);
    return false;
  }

};
