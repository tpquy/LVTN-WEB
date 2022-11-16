import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsufficientPermissionComponent } from './insufficient-permission.component';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';


const routes: Routes = [
  { 
    path: '', 
    component: InsufficientPermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsufficientPermissionRoutingModule { }
