import { Component } from '@angular/core';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { RouterOutlet } from '@angular/router';
import { EtherButtonTextIconComponent } from '../../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EtherDialogComponent } from '../../../shared/components/ether-dialog/ether-dialog.component';

@Component({
  selector: 'ether-my-bookings',
  standalone: true,
  imports: [
    EtherButtonTextIconComponent,
    EtherFilterComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  constructor(public dialog: MatDialog) {
    
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EtherDialogComponent, {
      width: '1250px',
      data: {
        room: 'room',
        guest: 'guest',
        guests: 'guests',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
