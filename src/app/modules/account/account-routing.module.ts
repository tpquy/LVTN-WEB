import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';
import { AccountComponent } from './account.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { 
    path: '', 
    component: BaseLayoutComponent,
    children: [
      { 
        path: '', 
        component: AccountComponent,
        children: [
          { 
            path: '', 
            component: ProfileComponent, 
          },
          { 
            path: 'profile', 
            component: ProfileComponent, 
          },
          { 
            path: 'order', 
            component: OrderComponent, 
          },
          { 
            path: 'address', 
            component: ListAddressComponent, 
          },
          { 
            path: 'order/order-detail', 
            component: OrderDetailComponent, 
          }
        ] 
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
