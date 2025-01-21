import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { catchError, tap, throwError } from 'rxjs';
import { AlertMessageService } from '../../../../shared/services/alert-message.service';
import { ToastType } from '../../../../shared/enums/toastype';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { FilesService } from '../../../../shared/services/files.service';

@Component({
  selector: 'app-products-list',
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  private productsService = inject(ProductService);
  private alertMessage = inject(AlertMessageService);
  private filesService = inject(FilesService);
  private _dialog = inject(MatDialog);

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected: any[] = [];

  rows: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  onSelect({ selected }: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getData(): void {
    this.productsService.getProducts().pipe(
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

  openDialog(action: boolean, row?: any): void {
    const dialog = this._dialog.open(ProductDialogComponent, {
      width: '500px',
      data: {
        title: 'Añadir Producto',
        action: action,
        product: row ?? null
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  changeStatus(id: number): void {
    this.productsService.deleteProduct(id).pipe(
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

  exportXLSX(type = 'products'): void {
    this.filesService.exportFiles(type).subscribe((blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `products-${new Date().toDateString()}.xlsx`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Error exporting file:', error);
    });

  }
}
