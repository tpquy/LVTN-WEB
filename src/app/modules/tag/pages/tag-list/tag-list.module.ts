import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListRoutingModule } from './tag-list-routing.module';
import { TagListComponent } from './tag-list.component';
import { AdminLayoutModule } from 'src/app/layouts/admin/admin-layout.module';


@NgModule({
  declarations: [
    TagListComponent
  ],
  imports: [
    CommonModule,
    TagListRoutingModule,
    AdminLayoutModule
  ]
})
export class TagListModule { }
