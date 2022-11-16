import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent,
        canActivate: [AuthGuard], // Yêu cầu đăng nhập, nếu không yêu cầu đăng nhập thì bỏ 2 dòng này
        data: [
          { roles: ['webAdmin']}
        ]  }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
