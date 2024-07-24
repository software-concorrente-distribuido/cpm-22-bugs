import { Component, ContentChildren, Query, QueryList } from '@angular/core';
import { EtherHeaderCellComponent } from './ether-header-cell/ether-header-cell.component';

@Component({
  selector: 'ether-table-header',
  template: `
    <thead class="ether-table-header">
      <ng-content select="ether-header-cell"></ng-content>
    </thead>
  `,
  styleUrl: './ether-table-header.component.scss',
  host: {
    class: 'ether-table-header'
  }
})
export class EtherTableHeaderComponent {
  @ContentChildren(EtherHeaderCellComponent) 
  etherHeaderCell = new QueryList<EtherHeaderCellComponent>();
}
