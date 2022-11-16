import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { ManageProductComponent } from './manage-product.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManageProductComponent],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    SharedModule
  ]
})
export class ManageProductModule { }
