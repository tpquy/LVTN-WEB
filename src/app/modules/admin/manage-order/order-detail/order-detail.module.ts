import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailRoutingModule } from './order-detail-routing.module';



@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderDetailRoutingModule
  ]
})
export class OrderDetailModule { }
