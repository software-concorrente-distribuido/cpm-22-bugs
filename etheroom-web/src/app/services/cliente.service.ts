import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  /* private baseApiUrl = environment.baseApiUrl; */
  /* Base da API*/
  private baseApiUrl = 'http://localhost:9090/api';

  /* Especificando a URL */
  private apiUrl = `${this.baseApiUrl}/cliente`;

  constructor(private http: HttpClient) {}

  createCliente(cliente: any): Observable<any>{

    const data = {
      wallet: cliente.wallet,
      email: cliente.email,
      senha: cliente.senha,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
    }
    
    console.log(data);
    const result = this.http.post(this.apiUrl, data);
    return result;
  }

}
