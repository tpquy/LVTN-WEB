import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';
import { SharedModule } from 'src/app/shared/shared.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseLayoutModule,
    SharedModule
  ]
})
export class HomeModule { }
