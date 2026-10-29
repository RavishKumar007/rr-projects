import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const adminCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  console.log("inter cept");
  if(req.url.includes('/admin')){
    console.log("admin")
    req = req.clone({
      withCredentials:true
    })
  } else {
    return next(req);
  }
  return next(req).pipe(
    catchError((error)=> {
      if(error.status === 401) {
        router.navigate(['/admin/login']);
      }
      return throwError(()=>error);
    })
  );
};
