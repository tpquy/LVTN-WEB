import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ManageProductComponent } from './manage-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: ManageProductComponent },
      { path: 'detail', component: ProductDetailComponent },
      { path: 'add-new', component: AddNewProductComponent },
      { path: 'update', component: UpdateProductComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
