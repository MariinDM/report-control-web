import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalstorageService);
  const router = inject(Router);

  if (localstorageService.getItem('token')) {
    router.navigate(['/home']);
    return false
  }
  return true;
};
