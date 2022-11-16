import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutModule } from 'src/app/layouts/admin/admin-layout.module';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { FileListComponent } from './pages/file-list/file-list.component';
import { FileDetailComponent } from './pages/file-detail/file-detail.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import("./pages/file-list/file-list.module").then(m => m.FileListModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import("./pages/file-detail/file-detail.module").then(m => m.FileDetailModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FileRoutingModule { }
