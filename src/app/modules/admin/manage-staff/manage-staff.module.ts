import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStaffRoutingModule } from './manage-staff-routing.module';
import { ManageStaffComponent } from './manage-staff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStaffComponent } from './add-staff/add-staff.component';


@NgModule({
  declarations: [ManageStaffComponent, AddStaffComponent],
  imports: [
    CommonModule,
    ManageStaffRoutingModule,
    SharedModule
  ]
})
export class ManageStaffModule { }
