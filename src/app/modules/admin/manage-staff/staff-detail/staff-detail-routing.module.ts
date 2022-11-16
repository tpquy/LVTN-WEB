import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { StaffDetailComponent } from './staff-detail.component';


const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: StaffDetailComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffDetailRoutingModule { }
