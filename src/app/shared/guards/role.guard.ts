import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalstorageService);
  const router = inject(Router);

  const user = localstorageService.getJsonItem('user') as { role_id: number };
  const role_id = user.role_id;

  if (role_id !== 1) {
    router.navigate(['/home']);
    return false
  }
  return true;
};
