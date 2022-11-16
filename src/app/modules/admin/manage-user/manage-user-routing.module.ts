import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { ManageUserComponent } from './manage-user.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: ManageUserComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
