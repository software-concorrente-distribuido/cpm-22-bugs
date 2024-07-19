import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../core/services/web3.service';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [],
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
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

    // Referências aos elementos do popup
    const openPopupBtn = document.getElementById('openPopup') as HTMLButtonElement;
    const popupContainer = document.getElementById('popupContainer') as HTMLDivElement;
    const closePopupBtn = document.getElementById('closePopup') as HTMLSpanElement;
    const getReservationInfoBtn = document.getElementById('getReservationInfo') as HTMLButtonElement;

    // Função para abrir o popup
    openPopupBtn.addEventListener('click', () => {
      popupContainer.style.display = 'flex';
    });

    // Função para fechar o popup
    closePopupBtn.addEventListener('click', () => {
      popupContainer.style.display = 'none';
    });

    // Adiciona evento de clique ao botão para obter informações da reserva
    getReservationInfoBtn.addEventListener('click', () => this.getReservationInfo());
  }

  // Função para calcular o número de dias entre duas datas
  private calculateDays(checkinDate: string, checkoutDate: string): number {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const timeDifference = checkout.getTime() - checkin.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24); // Converte a diferença de tempo de milissegundos para dias
    return dayDifference;
  }

  // Função para calcular o preço final da reserva
  private calculatePrice(checkinDate: string, checkoutDate: string, dailyRate: number): number {
    const numberOfDays = this.calculateDays(checkinDate, checkoutDate);
    return numberOfDays * dailyRate;
  }

  public async createBooking() {
    this.web3.isConnected();

    const checkinDate = (document.getElementById('checkin_date') as HTMLInputElement).value;
    const checkoutDate = (document.getElementById('checkout_date') as HTMLInputElement).value;
    const dailyRate = 0.16; // Definindo o preço diário

    if (checkinDate && checkoutDate) {
      try {
        const finalPrice = this.calculatePrice(checkinDate, checkoutDate, dailyRate);
        const id = await this.web3.createBooking("Hilton London Tower, Tooley Street", finalPrice, checkinDate, checkoutDate, 302, '0xa5F936CCDc04422ae960D48De5fB7E4378Bb2E47');
        const booking = await this.web3.getBooking(id);
        await this.web3.startBooking(id, this.todayDate);
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

  public async startBooking(bookingId: number) {
    try {
      await this.web3.startBooking(bookingId, this.todayDate);
      alert("Booking started!");
    } catch (error) {
      console.error("Error starting booking:", error);
      alert("Failed to start booking.");
    }
  }

  public async getReservationInfo() {
    const reservationIdInput = document.getElementById('reservationIdInput') as HTMLInputElement;
    
    if (reservationIdInput) {
      const reservationIdString = reservationIdInput.value;
      const reservationId = Number(reservationIdString); // Converte a string para número
  
      if (!isNaN(reservationId)) { // Verifica se a conversão foi bem-sucedida
        try {
          const booking = await this.web3.getBooking(reservationId);
          const bookingContractAddress = booking.bookingContract;
          const checkin = await this.web3.getCheckInDate(bookingContractAddress);
          const checkout = await this.web3.getCheckOutDate(bookingContractAddress);
          const roomnumber = await this.web3.getRoomNumber(bookingContractAddress);
          const guest = await this.web3.getGuest(bookingContractAddress);
          const status = await this.web3.getIsCancelled(bookingContractAddress);
          const amount = await this.web3.getAmount(bookingContractAddress);
  
          const reservationInfoContainer = document.getElementById('reservationInfoContainer') as HTMLDivElement;
          if (reservationInfoContainer) {
            reservationInfoContainer.innerHTML = `
              <p>Reservation ID: ${reservationId}</p>
              <p>Check-In Date: ${checkin}</p>
              <p>Check-Out Date: ${checkout}</p>
              <p>Booking Contract Address: ${bookingContractAddress}</p>
              <p>Room Number: ${roomnumber}</p>
              <p>Guest ETH Address: ${guest}</p>
              <p>Booking Cancelled?: ${status}</p>
              <p>Amount Payed: ${amount} Wei</p>
            `;
          } else {
            console.error("Reservation info container element not found.");
            alert("Reservation info container element not found.");
          }
        } catch (error) {
          console.error("Error getting reservation info:", error);
          alert("Failed to get reservation info.");
        }
      } else {
        alert("Invalid reservation ID. Please enter a numeric ID.");
      }
    } else {
      console.error("Reservation ID input element not found.");
      alert("Reservation ID input element not found.");
    }
  }
  
}
