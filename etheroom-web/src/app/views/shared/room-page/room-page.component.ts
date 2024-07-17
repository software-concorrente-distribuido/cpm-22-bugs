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

  public async CreateBooking() {
    
    // Verificando se o Web3 está conectado
    this.web3.isConnected();

     // Obtendo os valores dos campos de data
     const checkinDate = (document.getElementById('checkin_date') as HTMLInputElement).value;
     const checkoutDate = (document.getElementById('checkout_date') as HTMLInputElement).value;

    // Verificando se as datas não estão vazias
     if (checkinDate && checkoutDate) {
      try {
        // Criando a reserva na blockchain
        const id = await this.web3.createBooking("Hilton London Tower, Tooley Street", 0.053, checkinDate, checkoutDate, 302);
        const booking = await this.web3.getBooking(id);
        console.log(booking);
        alert("Booking created! ID: " + id);
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Failed to create booking.");
      }
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  }
}
