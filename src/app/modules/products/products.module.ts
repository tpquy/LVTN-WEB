import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductDetailComponent, ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    BaseLayoutModule,
  ]
})
export class ProductsModule { }
