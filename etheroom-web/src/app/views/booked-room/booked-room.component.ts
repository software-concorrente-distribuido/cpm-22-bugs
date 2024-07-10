import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-booked-room',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './booked-room.component.html',
  styleUrls: ['./booked-room.component.scss','./../../../styles/global.scss']
})
export class BookedRoomComponent {

}
