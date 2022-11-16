import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BaseLayoutModule } from 'src/app/layouts/base/base-layout.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { CategoryMenuComponent } from '../components/category-menu/category-menu.component';
import { CategoryMenuModule } from '../components/category-menu/category-menu.module';
import { ProductInfoComponent } from '../components/product-info/product-info.component';
import { ProductInfoModule } from 'src/app/shared/components/product-info/product-info.module';
@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    BaseLayoutModule,
    CategoryMenuModule,
    ProductInfoModule
  ]
})
export class HomePageModule { }
