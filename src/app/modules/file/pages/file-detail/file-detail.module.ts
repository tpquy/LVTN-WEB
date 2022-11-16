import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDetailRoutingModule } from './file-detail-routing.module';
import { FileDetailComponent } from './file-detail.component';
import { AdminLayoutModule } from 'src/app/layouts/admin/admin-layout.module';


@NgModule({
  declarations: [FileDetailComponent],
  imports: [
    CommonModule,
    FileDetailRoutingModule,
    AdminLayoutModule
  ]
})
export class FileDetailModule { }
