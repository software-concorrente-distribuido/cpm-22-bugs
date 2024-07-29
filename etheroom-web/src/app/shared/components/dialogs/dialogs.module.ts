import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { FormsModule } from '../forms/forms.module';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    DialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ButtonsModule,
    NgComponentOutlet
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogsModule { }
