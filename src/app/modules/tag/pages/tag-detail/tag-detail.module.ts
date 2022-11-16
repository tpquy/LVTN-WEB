import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagDetailRoutingModule } from './tag-detail-routing.module';
import { TagDetailComponent } from './tag-detail.component';
import { AdminLayoutModule } from 'src/app/layouts/admin/admin-layout.module';


@NgModule({
  declarations: [
    TagDetailComponent
  ],
  imports: [
    CommonModule,
    TagDetailRoutingModule,
    AdminLayoutModule
  ]
})
export class TagDetailModule { }
