import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  /* Base da API*/
  private baseApiUrl = 'http://localhost:9090';

  /* Especificando a URL */
  private apiUrl = `${this.baseApiUrl}/cliente`;

  constructor(private http: HttpClient) {}

  createCliente(cliente: any): Observable<any>{

    const url = `${this.apiUrl}/cadastrarCliente`;
    const data = {
      wallet: cliente.wallet, 
      email: cliente.email,
      senha: cliente.senha,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
    }
    
    console.log(data);
    const result = this.http.post(url, data);
    return result;
  }

   /* Consultar um Cliente no sistema através do ID */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  updateCliente(cliente: any): Observable<any>{

    const url = `${this.apiUrl}/${cliente.id}`;

    const data = {
      email: cliente.email,
      senha: cliente.senha,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
    };
    const result = this.http.put(url, data);
    return result;
  }

}
