import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Web3 from 'web3';
import { environment } from '../../../environments/environments';
import { ethers } from 'ethers';
import { EthereumAccount } from '../types/types';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private provider: any;
  private web3: any;
  private contractABIManager: any = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "bookingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "guest", "type": "address" } ], "name": "BookingCancelled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "bookingId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bookingContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guest", "type": "address" }, { "indexed": false, "internalType": "string", "name": "hotel", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "name": "BookingCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "string", "name": "hotel", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "name": "RoomLocked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "string", "name": "hotel", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "name": "RoomUnlocked", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "bookingContracts", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bookingCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "bookings", "outputs": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "roomLocked", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "string", "name": "_checkInDate", "type": "string" }, { "internalType": "string", "name": "_checkOutDate", "type": "string" }, { "internalType": "uint256", "name": "_roomNumber", "type": "uint256" }, { "internalType": "address payable", "name": "_hotelAddress", "type": "address" } ], "name": "createBooking", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [ { "internalType": "uint256", "name": "_bookingId", "type": "uint256" } ], "name": "cancelBooking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_bookingId", "type": "uint256" } ], "name": "getBooking", "outputs": [ { "components": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "internalType": "struct HotelBookingManager.BookingInfo", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getBookingContracts", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getActiveBookings", "outputs": [ { "components": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "internalType": "struct HotelBookingManager.BookingInfo[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "getBookingsByUser", "outputs": [ { "components": [ { "internalType": "address", "name": "bookingContract", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "string", "name": "hotel", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "uint256", "name": "roomNumber", "type": "uint256" } ], "internalType": "struct HotelBookingManager.BookingInfo[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_roomNumber", "type": "uint256" } ], "name": "isRoomLocked", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_roomNumber", "type": "uint256" } ], "name": "lockRoom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_roomNumber", "type": "uint256" } ], "name": "unlockRoom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  private contractABIBooking: any = [ { "inputs": [ { "internalType": "address", "name": "_guest", "type": "address" }, { "internalType": "string", "name": "_hotel", "type": "string" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "string", "name": "_checkInDate", "type": "string" }, { "internalType": "string", "name": "_checkOutDate", "type": "string" }, { "internalType": "uint256", "name": "_roomNumber", "type": "uint256" }, { "internalType": "address payable", "name": "_hotelAddress", "type": "address" } ], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "guest", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "refundAmount", "type": "uint256" } ], "name": "BookingCancelled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "guest", "type": "address" }, { "indexed": true, "internalType": "address", "name": "hotel", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "BookingStarted", "type": "event" }, { "inputs": [], "name": "amount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "checkInDate", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "checkOutDate", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "guest", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hotel", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hotelAddress", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isCancelled", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "roomNumber", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_caller", "type": "address" } ], "name": "cancelBooking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "currentDate", "type": "string" } ], "name": "startBooking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getBookingDetails", "outputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getGuest", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHotel", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getRoomNumber", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCheckInDate", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCheckOutDate", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getIsCancelled", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ];
  private contractAddressManager: string = '0x84171980C1cA4D2601e0Eba1939B80162A172dB5'; // Endereço do contrato HotelBookingManager
  private account: string = '';
  private secret: string = '';
  private message: string;

  constructor(public router: Router) {
    this.message = environment.ETHEROOM_APP_MESSAGE;
  }

  async initializeWeb3() {
    if (window.ethereum) {
      this.provider = window.ethereum;

      try {
        await this.provider.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(this.provider);
        this.provider.on('chainChanged', () => window.location.reload());
        this.provider.on('accountsChanged', () => window.location.reload());
      } catch (error) {
        console.error('Erro ao conectar ao MetaMask:', error);
        alert('Erro ao conectar ao MetaMask.');
      }
    } else {
      alert('Por favor, instale o MetaMask para utilizar esta aplicação.');
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

  async getSecret(): Promise<string> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const secret = signer.signMessage(this.message);

    return secret;
  }

  public async buildEthereumAccount(): Promise<EthereumAccount> {
    await this.getAccount().then(
      account => {
        this.account = account;
        console.log('Conta conectada:', account);
      }
    );

    await this.getSecret().then(
      secret => {
        this.secret = secret;
        console.log('Secret: ', secret);
      }
    );

    const ethereumAccount: EthereumAccount = {
      account: this.account,
      secret: this.secret
    };

    return ethereumAccount;
  }

  async createBooking(
    nomeHotel: string,
    valor: number,
    checkIn: string,
    checkOut: string,
    roomNumber: number,
    hotelAddress: string
  ): Promise<number> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIManager, this.contractAddressManager);

      const isLocked = await contract.methods.roomLocked(nomeHotel, roomNumber).call();
      
      if (isLocked) {
       console.log('Quarto está bloqueado para reserva.');
       return -1;
      }
      
      const valorWei = this.web3.utils.toWei(valor.toString(), 'ether');
  
      await contract.methods.lockRoom(nomeHotel, roomNumber).send({
       from: await this.getAccount(),
      });
  
      const receipt = await contract.methods.createBooking(
        nomeHotel,
        valorWei,
        checkIn,
        checkOut,
        roomNumber,
        hotelAddress
      ).send({
        from: await this.getAccount(),
        value: valorWei,
      });
      
      console.log(receipt);
  
      const bookingId = receipt.events.BookingCreated.returnValues.bookingId;
  
      await contract.methods.unlockRoom(nomeHotel, roomNumber).send({
       from: await this.getAccount(),
      });
      
      return bookingId;
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      // Adiciona detalhes específicos do erro
      if (error.message) {
        console.error('Mensagem de erro:', error.message);
      }
      if (error.data) {
        console.error('Dados do erro:', error.data);
      }
      throw error;
    }
  }
  

  async startBooking(bookingId: number, currentDate: string): Promise<void> {
    try {
      // Obtém o endereço do contrato de reserva associado ao bookingId
      const bookingInfo = await this.getBooking(bookingId);
      const bookingContractAddress = bookingInfo.bookingContract;

      // Cria uma instância do contrato de reserva
      const bookingContract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      
      await bookingContract.methods.startBooking(currentDate).send({
        from: await this.getAccount(),
      });
    } catch (error) {
      console.error('Erro ao iniciar reserva:', error);
      throw error;
    }
  }

  async getBooking(bookingId: number): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIManager, this.contractAddressManager);
      const booking = await contract.methods.getBooking(bookingId).call();
      return booking;
    } catch (error) {
      console.error('Erro ao obter reserva:', error);
      throw error;
    }
  }

  async cancelBooking(bookingId: number): Promise<void> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIManager, this.contractAddressManager);
      await contract.methods.cancelBooking(bookingId).send({
        from: await this.getAccount()
      });
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      throw error;
    }
  }

  // Chama a função getGuest do contrato
  async getGuest(bookingContractAddress: string): Promise<string> {
    const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
    return await contract.methods.getGuest().call();
  } catch (error) {
    console.error('Erro ao obter o hóspede:', error);
    throw error;
  }

  // Chama a função getHotel do contrato
  async getHotel(bookingContractAddress: string): Promise<string> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      return await contract.methods.getHotel().call();
    } catch (error) {
      console.error('Erro ao obter o hotel:', error);
      throw error;
    }
  }

  // Chama a função getRoomNumber do contrato
  async getRoomNumber(bookingContractAddress: string): Promise<number> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      return await contract.methods.getRoomNumber().call();
    } catch (error) {
      console.error('Erro ao obter o numero do quarto:', error);
      throw error;
    }
  }

  // Chama a função getAmount do contrato
  async getAmount(bookingContractAddress: string): Promise<number> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      return await contract.methods.getAmount().call();
    } catch (error) {
      console.error('Erro ao obter o valor:', error);
      throw error;
    }
  }

    // Chama a função getCheckInDate do contrato
    async getCheckInDate(bookingContractAddress: string): Promise<string> {
      try {
        const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
        return await contract.methods.getCheckInDate().call();
      } catch (error) {
        console.error('Erro ao obter a data de check-in:', error);
        throw error;
      }
    }

  // Chama a função getCheckOutDate do contrato
  async getCheckOutDate(bookingContractAddress: string): Promise<string> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      return await contract.methods.getCheckOutDate().call();
    } catch (error) {
      console.error('Erro ao obter a data de check-out:', error);
      throw error;
    }
  }

  // Chama a função getIsCancelled do contrato
  async getIsCancelled(bookingContractAddress: string): Promise<boolean> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABIBooking, bookingContractAddress);
      return await contract.methods.getIsCancelled().call();
    } catch (error) {
      console.error('Erro ao obter o status da reserva:', error);
      throw error;
    }
  }

}
