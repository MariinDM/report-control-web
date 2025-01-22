import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertMessageService } from '../../../../shared/services/alert-message.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { ToastType } from '../../../../shared/enums/toastype';
import { catchError, tap, throwError } from 'rxjs';
import { RenderImageComponent } from '../../../../shared/components/render-image/render-image.component';
import { ProductModel } from '../../interfaces/product';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {

  private data = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  private alertMessage = inject(AlertMessageService);
  private dialog = inject(MatDialogRef<ProductDialogComponent>);
  private _dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  action: boolean = true;
  title: string = '';
  product: ProductModel;
  selectedFile: File | null = null;

  constructor() {
    this.action = this.data.action;
    this.title = this.data.title;
    this.product = this.data.product;

    this.form = this.buildForm();
    if (this.product) {
      this.form.patchValue(this.product);
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      price: [],
      image: ['']
    });
  }

  sendData(): void {
    if (this.action) {
      this.addProduct();
    } else {
      this.editProduct();
    }
  }

  addProduct(): void {
    const product = this.form.value;

    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).pipe(
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

  editProduct(): void {
    const product = this.form.value;

    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.updateProduct(product.id, formData).pipe(
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

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  openImageDialog(): void {
    const dialog = this._dialog.open(RenderImageComponent, {
      data: {
        product: this.product,
        image: this.selectedFile
      }
    });
  }
}
