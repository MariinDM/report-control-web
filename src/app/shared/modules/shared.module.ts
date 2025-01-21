import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [
  NgxDatatableModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...modules
  ],
  exports: [
    modules
  ]
})
export class SharedModule { }
