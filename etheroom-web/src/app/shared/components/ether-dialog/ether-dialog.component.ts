import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonsModule } from '../buttons/buttons.module';

interface DialogData {
  room: string;
  guest: string;
  guests: string;
}

@Component({
  selector: 'ether-dialog',
  standalone: true,
  imports: [ButtonsModule],
  templateUrl: './ether-dialog.component.html',
  styleUrl: './ether-dialog.component.scss'
})
export class EtherDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EtherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public setImagePath(imagePath: string): string {
    return `../../../../assets/images/${imagePath}.svg`
  }
}
