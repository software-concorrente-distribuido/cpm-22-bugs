import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationRequest, AuthenticationResponse, EthereumAccount } from '../types/types';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl; // URL do backend
  private authUrl: string;

  constructor(private http: HttpClient) {
    this.authUrl = `${this.apiUrl}/oauth`;
  }

  public loginWithEthereum(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authUrl}/login`, authRequest);
  }

  public buildAuthRequest(ethereumAccount: EthereumAccount): AuthenticationRequest {
    const authRequest: AuthenticationRequest = {
      ethereumAddress: ethereumAccount.account,
      ethereumPublicKey: ethereumAccount.secret
    };
    
    return authRequest;
  }
}
