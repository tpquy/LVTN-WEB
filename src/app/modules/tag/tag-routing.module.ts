import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./pages/tag-list/tag-list.module').then(m => m.TagListModule) },
  { path: 'detail/:id', loadChildren: () => import('./pages/tag-detail/tag-detail.module').then(m => m.TagDetailModule) }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports: [
    RouterModule
  ]
})
export class TagRoutingModule { }
