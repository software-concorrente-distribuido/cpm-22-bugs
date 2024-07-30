import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hotel-rooms-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  templateUrl: './hotel-rooms-popup.component.html',
  styleUrl: './hotel-rooms-popup.component.scss'
})
export class HotelRoomsPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<HotelRoomsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
}
