import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [UpdateProductComponent],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    SharedModule
  ]
})
export class UpdateProductModule { }
