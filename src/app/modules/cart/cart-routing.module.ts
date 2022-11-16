import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';
import { CartComponent } from './cart.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: CartComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
