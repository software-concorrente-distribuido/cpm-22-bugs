import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogComponent } from './dialog.component';



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    NgComponentOutlet
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogsModule { }
