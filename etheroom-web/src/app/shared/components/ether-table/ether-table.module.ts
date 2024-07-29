import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtherTableComponent } from './ether-table.component';
import { EtherHeaderCellComponent } from './ether-table-header/ether-header-cell/ether-header-cell.component';
import { EtherTableHeaderComponent } from './ether-table-header/ether-table-header.component';
import { EtherRowCellComponent } from './ether-table-row/ether-row-cell/ether-row-cell.component';
import { EtherTableRowComponent } from './ether-table-row/ether-table-row.component';
import { EtherEmptyTableComponent } from './ether-empty-table/ether-empty-table.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    EtherTableComponent,
    EtherRowCellComponent,
    EtherTableRowComponent,
    EtherEmptyTableComponent,
    EtherHeaderCellComponent,
    EtherTableHeaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  exports: [
    EtherTableComponent,
    EtherRowCellComponent,
    EtherTableRowComponent,
    EtherEmptyTableComponent,
    EtherHeaderCellComponent,
    EtherTableHeaderComponent,
  ]
})
export class EtherTableModule { }
