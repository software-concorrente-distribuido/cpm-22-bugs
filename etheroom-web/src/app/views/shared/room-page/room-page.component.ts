import { Component } from '@angular/core';
import { Web3Service } from '../../../core/services/web3.service';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.scss'
})
export class RoomPageComponent {

  constructor (public web3: Web3Service) {
  }

  public async CreateBooking() {
    this.web3.isConnected();
    const id = await this.web3.createBooking("Hilton London Tower, Tooley Street", 0.053, "13/07/2024", "14/07/2024", 302);
    const booking = await this.web3.getBooking(id);
    console.log(booking);
  }
}
