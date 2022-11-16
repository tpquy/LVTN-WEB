import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsufficientPermissionRoutingModule } from './insufficient-permission-routing.module';
import { InsufficientPermissionComponent } from './insufficient-permission.component';
import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InsufficientPermissionComponent],
  imports: [
    CommonModule,
    InsufficientPermissionRoutingModule,
    SharedModule
  ]
})
export class InsufficientPermissionModule { }
