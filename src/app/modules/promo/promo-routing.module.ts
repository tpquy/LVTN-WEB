import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';

import { PromoComponent } from './promo.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: PromoComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoRoutingModule { }
