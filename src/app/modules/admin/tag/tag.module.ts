import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagComponent } from './tag.component';
import { AddCpuComponent } from './add-cpu/add-cpu.component';
import { UpdateCpuComponent } from './update-cpu/update-cpu.component';


@NgModule({
  declarations: [AddComponent, UpdateComponent, TagComponent, AddCpuComponent, UpdateCpuComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule
  ]
})
export class TagModule { }
