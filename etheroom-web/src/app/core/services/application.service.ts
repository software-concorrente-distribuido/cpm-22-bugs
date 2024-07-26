import { setProvider } from './../providers/global.providers';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { EnumsNames } from '../data/enums';
import { FormBuilder } from '@angular/forms';

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
    this.createGlobalProviders();
  }

  public findEnumByName(name: EnumsNames): Observable<Enum[]> {
    return this.http.get<Enum[]>(
      `${this.appApiUrl}/enum/${name}`
    );
  }

  private createGlobalProviders(): void {
    setProvider(FormBuilder, inject(FormBuilder));
  }
  
}
