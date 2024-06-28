import { Component } from '@angular/core';

@Component({
  selector: 'ether-form-field-error',
  template: `
    <span class="ether-form-field-error">
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './ether-form-field-error.component.scss'
})
export class EtherFormFieldErrorComponent {

}
