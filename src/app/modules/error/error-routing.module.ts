import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'page-not-found', 
    loadChildren: () => import("./pages/page-not-found/page-not-found.module").then(m => m.PageNotFoundModule)
  },
  { 
    path: 'insufficient-permission', 
    loadChildren: () => import("./pages/insufficient-permission/insufficient-permission.module").then(m => m.InsufficientPermissionModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
