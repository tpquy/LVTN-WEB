import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AccountRoutingModule } from '../account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
