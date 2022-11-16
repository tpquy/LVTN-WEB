import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './dialog/user-detail/user-detail.component';


@NgModule({
  declarations: [ManageUserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    SharedModule
  ]
})
export class ManageUserModule { }
