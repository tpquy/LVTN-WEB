import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductInfoRoutingModule } from './product-info-routing.module';
import { ProductInfoComponent } from './product-info.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [ProductInfoComponent],
  imports: [
    CommonModule,
    ProductInfoRoutingModule,
    SharedModule
  ],
  exports: [ProductInfoComponent]
})
export class ProductInfoModule { }
