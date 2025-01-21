import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../../shared/services/localstorage.service';
import { Router } from '@angular/router';
import { AlertMessageService } from '../../../shared/services/alert-message.service';
import { ToastType } from '../../../shared/enums/toastype';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private localStorage = inject(LocalstorageService);
  private alert = inject(AlertMessageService);
  private router = inject(Router);

  authForm!: FormGroup;

  constructor() {
    this.authForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  sendData(): void {
    const auth = this.authForm.value;
    // this.authService.login(auth).subscribe({
    //   next: (v) => {
    //     this.alert.showToast(v.message, '', ToastType.SUCCESS);
    //     this.localStorage.setItem('token', v.data.token);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    this.authService.login(auth).pipe(
      tap((v) => {
        this.alert.showToast(v.message, '', ToastType.SUCCESS);
        this.localStorage.setItem('token', v.data.token);
        this.localStorage.setItem('user', JSON.stringify(v.user));
        this.router.navigate(['/home']);
      }),
      catchError((err) => {
        this.alert.showToast(err.error.message, '', ToastType.ERROR);
        return throwError(() => err);
      })
    ).subscribe();
  }

}

