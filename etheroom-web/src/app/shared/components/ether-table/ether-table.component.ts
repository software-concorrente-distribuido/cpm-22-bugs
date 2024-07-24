import { Component } from '@angular/core';

@Component({
  selector: 'ether-table',
  template: `
    <table class="ether-table">
      <ng-content select="ether-table-header"></ng-content>
      <tbody>
        <ng-content select="ether-table-row"></ng-content>
      <tbody>
    </table>
  `,
  styleUrl: './ether-table.component.scss',
  host: {
    class: 'ether-table'
  }
})
export class EtherTableComponent {
}
