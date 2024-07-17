import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../core/services/web3.service';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.scss'
})
export class RoomPageComponent implements OnInit {
  public todayDate: string;

  constructor(public web3: Web3Service) { }

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.todayDate = `${year}-${month}-${day}`;
    console.log(this.todayDate);
  }

  public async createBooking() {
    this.web3.isConnected();

    const checkinDate = (document.getElementById('checkin_date') as HTMLInputElement).value;
    const checkoutDate = (document.getElementById('checkout_date') as HTMLInputElement).value;

    if (checkinDate && checkoutDate) {
      try {
        const id = await this.web3.createBooking("Hilton London Tower, Tooley Street", 0.053, checkinDate, checkoutDate, 302, '0x80524E6e4644eFc240BCd03adE126bBe6E7CbB79');
        const booking = await this.web3.getBooking(id);
        await this.web3.startBooking(id, this.todayDate);
        console.log(booking);

        // Obtenha o endereço do contrato de reserva do booking criado
        const bookingContractAddress = booking.bookingContract;

        const checkin = await this.web3.getCheckInDate(bookingContractAddress);
        const checkout = await this.web3.getCheckOutDate(bookingContractAddress);
        console.log('Check-In:' + checkin);
        console.log('Check-Out:' + checkout);

        alert("Booking created! ID: " + id);
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Failed to create booking.");
      }
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  }

  public async startBooking(bookingId: number) {
    try {
      await this.web3.startBooking(bookingId, this.todayDate);
      alert("Booking started!");
    } catch (error) {
      console.error("Error starting booking:", error);
      alert("Failed to start booking.");
    }
  }
}
