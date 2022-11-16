import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from '../../admin/account/account.component';
import { ProfileComponent } from './profile.component';



const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent,
    children: [
        { path: '', component: ProfileComponent }
      ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
