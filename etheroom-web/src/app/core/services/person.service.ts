import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Person } from '../models/person/person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personApiUrl: string;

  private readonly PERSON_PATH = 'person';

  constructor(
    private http: HttpClient
  ) {
    this.personApiUrl = `${environment.apiUrl}/${this.PERSON_PATH}`;
  }

  public create(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personApiUrl, person);
  }

  public findById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.personApiUrl}/${id}`);
  }

  public findByUserId(userId: string): Observable<Person> {
    return this.http.get<Person>(`${this.personApiUrl}/user/${userId}`);
  }

  public update(person: Person): Observable<void> {
    return this.http.put<void>(this.personApiUrl, person);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.personApiUrl}/${id}`);
  }

}
