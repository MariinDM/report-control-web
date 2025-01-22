import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const localstorageService = inject(LocalstorageService);
  const router = inject(Router);

  if (!localstorageService.getItem('token')) {
    router.navigate(['/login']);
    return false
  }
  return true;
};
