import { Injectable } from '@angular/core';

import Web3 from 'web3';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  private provider: any;
  private web3: any;
  private contractABI: any = [
    // Copie aqui o ABI do contrato HotelBookingManager
  ];
  private contractAddress: string = '0xfb070fe085D6fc81CDEceE503efEF3af49ebdF38'; // Endereço do contrato HotelBookingManager
  private account: string = '';

  constructor() {
    this.initializeWeb3();
  }

  private async initializeWeb3() {
    // Verifica se há um provider Ethereum (MetaMask, etc.) disponível
    if (window.ethereum) {
      this.provider = window.ethereum;
      
      try {
        // Solicita acesso à conta Ethereum
        await this.provider.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(this.provider);

        // Assina eventos de mudança de rede e de contas
        this.provider.on('chainChanged', () => window.location.reload());
        this.provider.on('accountsChanged', () => window.location.reload());
      } catch (error) {
        console.error('Erro ao conectar ao MetaMask:', error);
      }
    } else {
      console.warn('Por favor, instale o MetaMask para utilizar esta aplicação.');
    }
  }

  async isConnected(): Promise<boolean> {
    if (!this.web3 || !this.provider) {
      return false;
    }
    const accounts = await this.provider.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }

  async getAccount(): Promise<string> {
    if (!this.account) {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      this.account = accounts[0];
    }
    return this.account;
  }

  async createBooking(nomeHotel: string, valor: number, checkIn: number, checkOut: number): Promise<number> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      const valorWei = this.web3.utils.toWei(valor.toString(), 'ether');

      const receipt = await contract.methods.createBooking(nomeHotel, valorWei, checkIn, checkOut).send({
        from: await this.getAccount(),
        value: valorWei
      });

      // Retorna o ID da reserva criada
      const bookingId = receipt.events.BookingCreated.returnValues.bookingId;
      return bookingId;
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      throw error;
    }
  }

  async getBooking(bookingId: number): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      const booking = await contract.methods.getBooking(bookingId).call();
      return booking;
    } catch (error) {
      console.error('Erro ao obter reserva:', error);
      throw error;
    }
  }

  async cancelBooking(bookingId: number): Promise<void> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      await contract.methods.cancelBooking(bookingId).send({
        from: await this.getAccount()
      });
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      throw error;
    }
  }

}
