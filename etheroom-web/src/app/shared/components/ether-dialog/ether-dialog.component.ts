import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtherButtonIconComponent } from '../ether-button-icon/ether-button-icon.component';

interface DialogData {
  room: string;
  guest: string;
  guests: string;
}

@Component({
  selector: 'ether-dialog',
  standalone: true,
  imports: [EtherButtonIconComponent],
  templateUrl: './ether-dialog.component.html',
  styleUrl: './ether-dialog.component.scss'
})
export class EtherDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public setIconPath(iconPath: string): string {
    return `../../../../assets/icons/${iconPath}.svg`
  }

  public setImagePath(imagePath: string): string {
    return `../../../../assets/images/${imagePath}.svg`
  }
}
