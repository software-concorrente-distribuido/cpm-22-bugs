import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/oauth'; // URL do backend

  constructor(private http: HttpClient) {}

  loginWithEthereum(ethereumAddress: string, ethereumPublicKey: string): Observable<AuthResponse> {
    const requestBody = { ethereumAddress, ethereumPublicKey };
    console.log('Request Body:', JSON.stringify(requestBody));
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, requestBody);
  }
}
