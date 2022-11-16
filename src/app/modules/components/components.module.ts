import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [
    
  ]
})
export class ComponentsModule { }
