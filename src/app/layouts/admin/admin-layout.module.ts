import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminLayoutHeaderComponent } from './admin-layout-header/admin-layout-header.component';
import { AdminLayoutFooterComponent } from './admin-layout-footer/admin-layout-footer.component';
import { AdminLayoutNavComponent } from './admin-layout-nav/admin-layout-nav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminLayoutHeaderComponent,
    AdminLayoutFooterComponent,
    AdminLayoutNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AdminLayoutComponent,
    AdminLayoutHeaderComponent,
    AdminLayoutFooterComponent,
    AdminLayoutNavComponent
  ]
})
export class AdminLayoutModule { }
