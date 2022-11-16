import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryMenuComponent } from './category-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryMenuComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CategoryMenuComponent
  ]
})
export class CategoryMenuModule { }
