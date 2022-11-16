import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileListRoutingModule } from './file-list-routing.module';
import { FileListComponent } from './file-list.component';
import { AdminLayoutModule } from 'src/app/layouts/admin/admin-layout.module';


@NgModule({
  declarations: [FileListComponent],
  imports: [
    CommonModule,
    FileListRoutingModule,
    AdminLayoutModule
  ]
})
export class FileListModule { }
