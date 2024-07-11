import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EtherButtonIconComponent } from '../ether-button-icon/ether-button-icon.component';
import { EtherButtonTextIconComponent } from "../ether-button-text-icon/ether-button-text-icon.component";

interface DialogData {
  room: string;
  guest: string;
  guests: string;
}

@Component({
  selector: 'ether-dialog',
  standalone: true,
  imports: [EtherButtonIconComponent, EtherButtonTextIconComponent],
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
