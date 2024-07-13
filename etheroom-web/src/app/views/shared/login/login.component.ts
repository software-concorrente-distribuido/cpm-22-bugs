import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtherButtonTextIconComponent } from '../../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { Web3Service } from '../../../core/services/web3.service';
import { AuthService } from '../../../core/services/auth.service';
import { AuthenticationResponse, EthereumAccount } from '../../../core/types/types';

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
  public ethereumAccount: EthereumAccount;

  constructor(
    public router: Router,
    public web3Service: Web3Service,
    public authService: AuthService
  ) { }

  public async login(): Promise<void> {
    try {
      const loginInfo: EthereumAccount = await this.handleWeb3Init();
      
      this.handleLogin(loginInfo);
    } catch (error) {
      console.error('Erro ao conectar a MetaMask ou autenticar:', error);
      // Adicione um tratamento de erros adequado aqui, como exibir uma mensagem de erro ao usuário.
    }
  }  

  public pathToImage(imageName: string, extension: string): string {
    return `./../../../assets/images/${imageName}.${extension}`;
  }

  private async handleWeb3Init(): Promise<EthereumAccount> {
    try {
      await this.web3Service.initializeWeb3(); // Conecta com Metamask

      await this.web3Service.buildEthereumAccount().then(
        account => this.ethereumAccount = account
      ); // Cria um objeto EthereumAccount com o endereço Ethereum e a chave pública
  
      this.router.navigate(['/home']); // PROVISÓRIO

      if (!this.ethereumAccount.secret) {
        throw new Error('User rejected signing the message');
      }

      return this.ethereumAccount;

    } catch (error) {
      console.error('Erro ao conectar a MetaMask:', error);
      // Adicione um tratamento de erros adequado aqui, como exibir uma mensagem de erro ao usuário.
      return null;
    }
  }

  private handleLogin(ethereumAccount: EthereumAccount): void {
    const authRequest = this.authService.buildAuthRequest(ethereumAccount);

    this.authService.loginWithEthereum(authRequest).subscribe({
      next: (response: AuthenticationResponse) => this.handleAuthResponse(response),
      error: (error) => console.error('Erro ao autenticar:', error)
    });
  }

  private handleAuthResponse(response: AuthenticationResponse): void {
    if (response && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken); // Armazena o token de acesso
      this.router.navigate(['/home']); // Navega para a página inicial
    } else {
      this.router.navigate(['/register']); // Navega para a página de registro
    }
  }
}
