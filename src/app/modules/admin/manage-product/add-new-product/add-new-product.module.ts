import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewProductRoutingModule } from './add-new-product-routing.module';
import { AddNewProductComponent } from './add-new-product.component';
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [AddNewProductComponent],
  imports: [
    CommonModule,
    AddNewProductRoutingModule,
    SharedModule
  ]
})
export class AddNewProductModule { }
