import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagDetailComponent } from './tag-detail.component';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: TagDetailComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TagDetailRoutingModule { }
