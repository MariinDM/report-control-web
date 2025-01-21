import { Component, inject } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-render-image',
  imports: [SharedModule, MaterialModule],
  templateUrl: './render-image.component.html',
  styleUrl: './render-image.component.scss'
})
export class RenderImageComponent {
  private data = inject(MAT_DIALOG_DATA);
  imageSrc: string | ArrayBuffer | null = null;

  constructor() {
    if (this.data.product.image_url) {
      this.imageSrc = this.data.product.image_url;
    } else {
      this.loadImage(this.data.image);
    }
  }

  loadImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
