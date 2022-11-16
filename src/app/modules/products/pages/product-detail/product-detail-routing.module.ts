import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';
import { ProductDetailComponent } from './product-detail.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product-detail.module').then(m => m.ProductDetailModule),
    children: [ 
      { path: '', component: ProductDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailRoutingModule { }
