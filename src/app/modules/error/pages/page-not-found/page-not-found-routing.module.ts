import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: BaseLayoutComponent,
    children: [
      { path: '', component: PageNotFoundComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
