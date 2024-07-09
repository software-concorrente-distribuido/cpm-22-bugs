import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtherFormFieldComponent } from './ether-form-field/ether-form-field.component';
import { EtherFormFieldLabelComponent } from './ether-form-field-label/ether-form-field-label.component';
import { EtherFormFieldErrorComponent } from './ether-form-field-error/ether-form-field-error.component';



@NgModule({
  declarations: [
    EtherFormFieldComponent,
    EtherFormFieldLabelComponent,
    EtherFormFieldErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EtherFormFieldComponent,
    EtherFormFieldLabelComponent,
    EtherFormFieldErrorComponent
  ]
})
export class InputsModule { }
