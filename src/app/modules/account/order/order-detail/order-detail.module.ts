import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from '../../account-routing.module';



@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class OrderDetailModule { }
