import { Component } from '@angular/core';

@Component({
  selector: 'ether-table-row',
  template: `
    <tr class="ether-table-row">
      <ng-content select="ether-row-cell"></ng-content>
    </tr>
  `,
  styleUrl: './ether-table-row.component.scss',
  host: {
    class: 'ether-table-row'
  }
})
export class EtherTableRowComponent {

}
