import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryTagRoutingModule } from './category-tag-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryTagComponent } from './category-tag.component';

@NgModule({
  declarations: [CategoryTagComponent, AddComponent, UpdateComponent],
  imports: [
    CommonModule,
    CategoryTagRoutingModule,
    SharedModule
  ]
})
export class CategoryTagModule { }
