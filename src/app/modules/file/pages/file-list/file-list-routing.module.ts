import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: FileListComponent },
    ],
    canActivate: [AuthGuard],
    data: { 
      anyPermissions: ['READ_FILE', 'MANAGE_FILE'],
      permissions: ['VIEW_FILE']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileListRoutingModule { }
