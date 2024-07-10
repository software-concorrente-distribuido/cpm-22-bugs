import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private appApiUrl: string;

  private readonly APP_PATH: string = 'app';

  constructor(
    private http: HttpClient
  ) { 
    this.appApiUrl = `${environment.apiUrl}/${this.APP_PATH}`;
  }

  public findEnumByName(name: string): Observable<Enum[]> {
    return this.http.get<Enum[]>(
      `${this.appApiUrl}/enum/${name}`
    );
  }
  
}
