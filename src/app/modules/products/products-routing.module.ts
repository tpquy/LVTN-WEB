import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';
import { ProductsComponent } from './products.component';
import { ProductsModule } from './products.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./products.module').then(m => m.ProductsModule),
    children: [
      {
        path: '',
        component: BaseLayoutComponent,
        children: [
          { path: '', component: ProductsComponent },
          { path: 'product-detail/:id', loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
        ] 
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
