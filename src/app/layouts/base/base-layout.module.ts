import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseLayoutHeaderComponent } from './base-layout-header/base-layout-header.component';
import { BaseLayoutFooterComponent } from './base-layout-footer/base-layout-footer.component';
import { BaseLayoutNavComponent } from './base-layout-nav/base-layout-nav.component';
import { RouterModule } from '@angular/router';
import { CategoryMenuModule } from 'src/app/modules/components/category-menu/category-menu.module';



@NgModule({
  declarations: [
    BaseLayoutComponent, 
    BaseLayoutHeaderComponent, 
    BaseLayoutFooterComponent, 
    BaseLayoutNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CategoryMenuModule
  ],
  exports: [
    BaseLayoutComponent, 
    BaseLayoutHeaderComponent, 
    BaseLayoutFooterComponent, 
    BaseLayoutNavComponent
  ]
})
export class BaseLayoutModule { }
