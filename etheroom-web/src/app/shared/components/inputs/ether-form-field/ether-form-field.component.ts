import { Component } from '@angular/core';

@Component({
  selector: 'ether-form-field',
  template: `
    <div class="ether-form-field">
      <ng-content select="ether-form-field-label"></ng-content>
      <ng-content select="input"></ng-content>
      <ng-content select="textarea"></ng-content>
      <ng-content select="mat-select"></ng-content>
      <ng-content select="ether-form-field-error"></ng-content>
    </div>
  `,
  styleUrl: './ether-form-field.component.scss'
})
export class EtherFormFieldComponent {

}
