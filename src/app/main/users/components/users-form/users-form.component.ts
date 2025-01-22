import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AlertMessageService } from '../../../../shared/services/alert-message.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastType } from '../../../../shared/enums/toastype';
import { UserModel } from '../../interfaces/user';

@Component({
  selector: 'app-users-form',
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent {
  private data = inject(MAT_DIALOG_DATA);
  private userService = inject(UserService);
  private alertMessage = inject(AlertMessageService);
  private dialog = inject(MatDialogRef<UsersFormComponent>);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  action: boolean = true;
  title: string = '';
  user: UserModel;
  selectedFile: File | null = null;

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Capturista' }
  ]

  constructor() {
    this.action = this.data.action;
    this.title = this.data.title;
    this.user = this.data.user;

    this.form = this.buildForm();
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: [''],
      email: [''],
      password: [''],
      role_id: [null],
    });
  }

  sendData(): void {
    if (this.action) {
      this.addUser();
    } else {
      this.editUser();
    }
  }

  addUser(): void {
    const user = this.form.value;

    this.userService.addUser(user).pipe(
      tap((v) => {
        this.alertMessage.showToast(v.message, '', ToastType.SUCCESS);
        this.dialog.close();
      }),
      catchError((err) => {
        this.alertMessage.showToast(err.error.message, '', ToastType.ERROR);
        return throwError(() => err);
      })
    ).subscribe();
  }

  editUser(): void {
    const user = this.form.value;

    this.userService.updateUser(user.id, user).pipe(
      tap((v) => {
        this.alertMessage.showToast(v.message, '', ToastType.SUCCESS);
        this.dialog.close();
      }),
      catchError((err) => {
        this.alertMessage.showToast(err.error.message, '', ToastType.ERROR);
        return throwError(() => err);
      })
    ).subscribe();
  }

}
