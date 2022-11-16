import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NofiRoutingModule } from './nofi-routing.module';
import { NofiComponent } from './nofi.component';


@NgModule({
  declarations: [NofiComponent],
  imports: [
    CommonModule,
    NofiRoutingModule
  ]
})
export class NofiModule { }
