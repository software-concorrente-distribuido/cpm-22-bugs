import { Component } from '@angular/core';

@Component({
  selector: 'ether-row-cell',
  standalone: true,
  imports: [],
  template: `
    <div class='ether-row-cell'>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './ether-row-cell.component.scss',
  host: {
    class: 'ether-row-cell'
  }
})
export class EtherRowCellComponent {

}
