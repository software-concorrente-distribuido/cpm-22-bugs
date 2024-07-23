import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'ether-header-cell',
  template: `
    <th class="ether-header-cell">
      <ng-content></ng-content>
    </th>
  `,
  styleUrl: './ether-header-cell.component.scss',
  host: {
    class: 'ether-header-cell'
  }
})
export class EtherHeaderCellComponent {

}
