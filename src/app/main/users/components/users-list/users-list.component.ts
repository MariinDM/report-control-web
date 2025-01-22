import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { catchError, tap, throwError } from 'rxjs';
import { ToastType } from '../../../../shared/enums/toastype';
import { AlertMessageService } from '../../../../shared/services/alert-message.service';
import { FilesService } from '../../../../shared/services/files.service';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../../services/user.service';
import { UsersFormComponent } from '../users-form/users-form.component';
import { UserModel } from '../../interfaces/user';

@Component({
  selector: 'app-users-list',
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private usersService = inject(UserService);
  private alertMessage = inject(AlertMessageService);
  private filesService = inject(FilesService);
  private _dialog = inject(MatDialog);

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected: any[] = [];

  rows: UserModel[] = [];

  ngOnInit(): void {
    this.getData();
  }

  onSelect({ selected }: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getData(): void {
    this.usersService.getUsers().pipe(
      tap((v) => {
        this.rows = v.data;
        this.alertMessage.showToast(v.message, '', ToastType.SUCCESS);
      }),
      catchError((err) => {
        this.alertMessage.showToast(err.error.message, '', ToastType.ERROR);
        return throwError(() => err)
      })
    ).subscribe();
  }

  openDialog(action: boolean, title: string, row?: any): void {
    const dialog = this._dialog.open(UsersFormComponent, {
      width: '500px',
      data: {
        title: title,
        action: action,
        user: row ?? null
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  changeStatus(id: number): void {
    this.usersService.deleteUser(id).pipe(
      tap((v) => {
        this.alertMessage.showToast(v.message, '', ToastType.SUCCESS);
        this.getData();
      }),
      catchError((err) => {
        this.alertMessage.showToast(err.error.message, '', ToastType.ERROR);
        return throwError(() => err);
      })
    ).subscribe();
  }

  exportXLSX(type = 'users'): void {
    this.filesService.exportFiles(type).subscribe((blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `users-${new Date().toDateString()}.xlsx`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Error exporting file:', error);
    });

  }
}
