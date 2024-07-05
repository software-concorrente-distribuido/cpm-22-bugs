import { Component, ContentChildren } from '@angular/core';
import { EtherRowCellComponent } from './ether-row-cell/ether-row-cell.component';

@Component({
  selector: 'ether-table-row',
  standalone: true,
  imports: [],
  template: `
    <div class='ether-table-row'>
      <ng-content select='ether-row-cell'></ng-content>
    </div>
  `,
  styleUrl: './ether-table-row.component.scss',
  host: {
    class: 'ether-table-row'
  }
})
export class EtherTableRowComponent {
  @ContentChildren(EtherRowCellComponent) cells?: EtherRowCellComponent[];
}
