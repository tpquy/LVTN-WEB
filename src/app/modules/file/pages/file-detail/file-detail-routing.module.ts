import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileDetailComponent } from './file-detail.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: FileDetailComponent }
    ],
    canActivate: [AuthGuard],
    data: { 
      anyPermissions: ['READ_FILE', 'MANAGE_FILE'],
      permissions: ['VIEW_FILE']
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FileDetailRoutingModule { }
