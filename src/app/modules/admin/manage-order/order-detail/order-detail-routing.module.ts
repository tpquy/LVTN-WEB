import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { OrderDetailComponent } from 'src/app/modules/admin/manage-order/order-detail/order-detail.component';


// const routes: Routes = [
//   { 
//     path: '', 
//     pathMatch: 'full',
//     component: AdminLayoutComponent,
//     children: [
//       { path: '', component: OrderDetailComponent }
//     ] 
//   },
// ];

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./order-detail.module').then(m => m.OrderDetailModule),
    children: [ 
      { path: '', component: OrderDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule { }
