import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Web3 from 'web3';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  private provider: any;
  private web3: any;
  private contractABI: any = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "bookingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "guest", "type": "address" } ], "name": "BookingCancelled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "bookingId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bookingContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guest", "type": "address" }, { "indexed": false, "internalType": "string", "name": "hotel", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "BookingCreated", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "bookingContracts", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bookingCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "bookings", "outputs": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_checkInDate", "type": "uint256" }, { "internalType": "uint256", "name": "_checkOutDate", "type": "uint256" } ], "name": "createBooking", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [ { "internalType": "uint256", "name": "_bookingId", "type": "uint256" } ], "name": "cancelBooking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_bookingId", "type": "uint256" } ], "name": "getBooking", "outputs": [ { "components": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" } ], "internalType": "struct HotelBookingManager.BookingInfo", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getBookingContracts", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function", "constant": true } ];
  private contractAddress: string = '0xfb070fe085D6fc81CDEceE503efEF3af49ebdF38'; // Endereço do contrato HotelBookingManager
  private account: string = '';

  constructor(public router: Router) {
    
  }

  async initializeWeb3() {
    // Verifica se há um provider Ethereum (MetaMask, etc.) disponível
    if (window.ethereum) {
      this.provider = window.ethereum;
      
      try {
        // Solicita acesso à conta Ethereum
        await this.provider.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(this.provider);
        this.router.navigate(['/home']);
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