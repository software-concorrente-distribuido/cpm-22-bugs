import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { EtherIconTextComponent } from "../../../shared/components/ether-icon-text/ether-icon-text.component";
import { ButtonsModule } from "../buttons/buttons.module";

@Component({
  selector: 'app-hotel-rooms-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, EtherIconTextComponent, ButtonsModule],
  templateUrl: './hotel-rooms-popup.component.html',
  styleUrl: './hotel-rooms-popup.component.scss',
  host: {
    class: 'hotel-rooms-popup'
  }
})
export class HotelRoomsPopupComponent {
openRoomsDialog(arg0: any) {
throw new Error('Method not implemented.');
}

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<HotelRoomsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  goToRoomPage(id: any) {
    this.dialogRef.close();
    this.router.navigate([`/guest/room-details`, id]);
  }
}
