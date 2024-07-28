import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogsService } from '../dialogs.service';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../forms/forms.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonsModule } from '../../buttons/buttons.module';

interface DialogData {
  hotelRoomForm: FormGroup;
}

@Component({
  selector: 'ether-add-room-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsModule],
  templateUrl: './add-room-dialog.component.html',
  styleUrl: './add-room-dialog.component.scss',
})
export class AddRoomDialogComponent {

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public hotelId$: BehaviorSubject<string> = new BehaviorSubject(null);

  // @Input()
  // public set hotelId(hotelId: string) {
  //   this.hotelId$.next(hotelId);
  // }

  // @Input()
  // public set hotelRoomForm(value: FormGroup) {
  //   this.hotelRoomForm$.next(value);
  // }

  constructor(
    public dialogRef: MatDialogRef<AddRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public onClickOption(bool: boolean): void {
    this.dialogRef.close(bool);
  }

}
