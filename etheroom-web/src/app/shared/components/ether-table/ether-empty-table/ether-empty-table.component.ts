import { Component } from '@angular/core';

@Component({
  selector: 'ether-empty-table',
  template: `
    <span>No data available</span>
  `,
  styleUrl: './ether-empty-table.component.scss',
  host: {
    class: 'ether-empty-table'
  }
})
export class EtherEmptyTableComponent {

}
