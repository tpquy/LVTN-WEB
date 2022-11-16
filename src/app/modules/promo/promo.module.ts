import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';

import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';


@NgModule({
  declarations: [PromoComponent],
  imports: [
    CommonModule,
    PromoRoutingModule,
    SharedModule,
    BaseLayoutModule
  ]
})
export class PromoModule { }
