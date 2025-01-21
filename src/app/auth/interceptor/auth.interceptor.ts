import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { LocalstorageService } from '../../shared/services/localstorage.service';

export function intercept(req: HttpRequest<any>, next: HttpHandler) {
  const router = inject(Router);
  const localStorageService = inject(LocalstorageService);

  if (localStorageService.hasItem('token')) {
    let token = localStorageService.getItem('token');
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    return next.handle(reqClone).pipe(
      tap((event: HttpEvent<any>) => { }),
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorageService.clear();
            router.navigate(['/']);
            return next.handle(reqClone);
          }
        }
        return throwError(() => err);
      })
    );
  } else {
    const reqClone = req.clone({
      setHeaders: {
        Accept: 'application/json',
      },
    });
    return next.handle(reqClone);
  }
}


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const localStorageService = inject(LocalstorageService);

  let token = localStorageService.getItem('token');
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          router.navigate(['/']);
          next(newReq);
        }
      }

      return throwError(() => error);
    })
  );
};