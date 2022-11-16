import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { AddNewProductComponent } from './add-new-product.component';


const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AddNewProductComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewProductRoutingModule { }
