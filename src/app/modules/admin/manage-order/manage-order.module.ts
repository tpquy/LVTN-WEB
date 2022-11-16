import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrderRoutingModule } from './manage-order-routing.module';
import { ManageOrderComponent } from './manage-order.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManageOrderComponent],
  imports: [
    CommonModule,
    ManageOrderRoutingModule,
    SharedModule
  ]
})
export class ManageOrderModule { }
