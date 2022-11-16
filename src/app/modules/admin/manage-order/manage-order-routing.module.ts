import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { ManageOrderComponent } from './manage-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


// const routes: Routes = [
//   { 
//     path: '', 
//     pathMatch: 'full',
//     component: AdminLayoutComponent,
//     children: [
//       { path: '', component: ManageOrderComponent },
//       { path: '/order-detail', component: OrderDetailComponent }
//     ] 
//   },
// ];


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./manage-order.module').then(m => m.ManageOrderModule),
    children: [
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', component: ManageOrderComponent },
          { path: 'order-detail/:id', loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule) },
        ] 
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrderRoutingModule { }
