import { Component } from '@angular/core';
import { EtherButtonTextIconComponent } from '../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { Router } from '@angular/router';
import { Web3Service } from '../../core/services/web3.service';

@Component({
  selector: 'ether-login',
  standalone: true,
  imports: [EtherButtonTextIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'ether-login'
  }
})
export class LoginComponent {

  constructor(public router: Router, public web3: Web3Service) { }

  public async handleButtonClick(): Promise<void> {
    try {
      await this.web3.initializeWeb3();
      const account = await this.web3.getAccount();
      console.log('Conta conectada:', account);
      // Navegar para a página inicial
    } catch (error) {
      console.error('Erro ao conectar a MetaMask:', error);
    }
  }

  public pathToImage(imageName: string, extension: string): string {
    return `./../../../assets/images/${imageName}.${extension}`;
  }
}
