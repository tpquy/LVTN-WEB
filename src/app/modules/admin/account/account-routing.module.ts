import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { AccountComponent } from './account.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AccountComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
