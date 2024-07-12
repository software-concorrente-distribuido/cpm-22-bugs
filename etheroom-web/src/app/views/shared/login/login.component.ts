import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtherButtonTextIconComponent } from '../../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { Web3Service } from '../../../core/services/web3.service';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth/auth-response.model';

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

  constructor(public router: Router, public web3: Web3Service, public authService: AuthService) { }

  public async handleButtonClick(): Promise<void> {
    try {
      await this.web3.initializeWeb3(); // Conecta com Metamask
      const account = await this.web3.getAccount(); // Obtém o endereço Ethereum do usuário
      console.log('Conta conectada:', account); // Envia o endereço Ethereum ao backend para autenticação
      
      const secret = await this.web3.getSecret();
      console.log('Secret: ', secret);

      const authResponse: AuthResponse = await this.authService.loginWithEthereum(account, secret).toPromise();
      if (authResponse && authResponse.accessToken) {
        localStorage.setItem('accessToken', authResponse.accessToken); // Armazena o token de acesso
        this.router.navigate(['/home']); // Navega para a página inicial
      } else {
        this.router.navigate(['/register']); // Navega para a página de registro
      }
    } catch (error) {
      console.error('Erro ao conectar a MetaMask:', error);
    }
  }

  public pathToImage(imageName: string, extension: string): string {
    return `./../../../assets/images/${imageName}.${extension}`;
  }
}
