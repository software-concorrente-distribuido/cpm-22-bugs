import { Component, ContentChildren } from '@angular/core';
import { EtherHeaderCellComponent } from './ether-header-cell/ether-header-cell.component';

@Component({
  selector: 'ether-table-header',
  standalone: true,
  imports: [],
  template: `
    <div class='ether-table-header'>
      <ng-content select='ether-header-cell'></ng-content>
    </div>
  `,
  styleUrl: './ether-table-header.component.scss',
  host: {
    class: 'ether-table-header'
  }
})
export class EtherTableHeaderComponent {
  @ContentChildren(EtherHeaderCellComponent) cells?: EtherHeaderCellComponent[];
}
