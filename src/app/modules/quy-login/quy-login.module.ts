import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuyLoginRoutingModule } from './quy-login-routing.module';
import { QuyLoginComponent } from './quy-login.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [QuyLoginComponent],
  imports: [
    CommonModule,
    QuyLoginRoutingModule,
    SharedModule
  ]
})
export class QuyLoginModule { }
