import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';
import { NofiComponent } from './nofi.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: NofiComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NofiRoutingModule { }
