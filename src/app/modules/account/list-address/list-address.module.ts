import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressComponent } from './list-address.component';
import { AccountRoutingModule } from '../account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNewAddressComponent } from './dialog/add-new-address/add-new-address.component';
import { UpdateAddressComponent } from './dialog/update-address/update-address.component';



@NgModule({
  declarations: [ListAddressComponent, AddNewAddressComponent, UpdateAddressComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class ListAddressModule { }
