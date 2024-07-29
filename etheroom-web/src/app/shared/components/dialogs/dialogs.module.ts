import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { FormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [
    DialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgComponentOutlet
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogsModule { }
