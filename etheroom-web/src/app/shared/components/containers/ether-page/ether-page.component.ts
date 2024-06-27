import { Component } from '@angular/core';

@Component({
  selector: 'ether-page',
  standalone: true,
  imports: [],
  template: `
    <div class="ether-page-container">
        <ng-content></ng-content>
    </div>
  `,
  styleUrl: './ether-page.component.scss'
})
export class EtherPageComponent {

}
