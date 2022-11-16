import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BaseLayoutComponent } from 'src/app/layouts/base/base-layout/base-layout.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
