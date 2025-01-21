import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastType } from '../enums/toastype';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor() { }

  showToast(title: string, text: string, icon: ToastType) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon,
      title,
      text,
    });
  }

  showConfirm(
    title: string,
    text: string,
    icon: ToastType,
    action: () => void
  ) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  }
}
