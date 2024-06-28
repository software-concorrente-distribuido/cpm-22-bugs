import { Component } from '@angular/core';

@Component({
  selector: 'ether-form-field-label',
  template: `
    <label class="ether-form-field-label">
      <ng-content></ng-content>
    </label>
  `,
  styleUrl: './ether-form-field-label.component.scss'
})
export class EtherFormFieldLabelComponent {

}
