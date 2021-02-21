import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterdataPipe } from './filterdata.pipe';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [FilterdataPipe, FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterdataPipe,
    FilterPipe
  ]
})
export class PipesModule { }
