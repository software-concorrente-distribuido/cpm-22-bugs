import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtherButtonComponent } from './ether-button/ether-button.component';
import { EtherButtonIconComponent } from './ether-button-icon/ether-button-icon.component';
import { EtherButtonTextIconComponent } from './ether-button-text-icon/ether-button-text-icon.component';



@NgModule({
  declarations: [
    EtherButtonComponent,
    EtherButtonIconComponent,
    EtherButtonTextIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EtherButtonComponent,
    EtherButtonIconComponent,
    EtherButtonTextIconComponent
  ]
})
export class ButtonsModule { }
