import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { AccountRoutingModule } from '../../admin/account/account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
