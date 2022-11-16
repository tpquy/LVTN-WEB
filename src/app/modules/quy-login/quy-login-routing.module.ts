import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuyLoginComponent } from './quy-login.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    children: [
      { path: '', component: QuyLoginComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuyLoginRoutingModule { }
