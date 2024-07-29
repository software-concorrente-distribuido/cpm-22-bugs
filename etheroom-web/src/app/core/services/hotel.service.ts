import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Hotel } from '../models/hotel/hotel.model';
import { Observable } from 'rxjs';
import { Page } from '../types/types';
import { Optional } from '../utils/optional';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelApiUrl: string;

  private readonly HOTEL_PATH = 'hotel';

  constructor(
    private http: HttpClient
  ) {
    this.hotelApiUrl = `${environment.apiUrl}/${this.HOTEL_PATH}`;
  }

  public create(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.hotelApiUrl, hotel);
  }

  public findAll(
    page: number,
    size: number,
    location: string = null,
    checkIn: Date = null,
    checkOut: Date = null,
    numberOfGuests: number = null
  ): Observable<Page<Hotel>> {
    return this.http.get<Page<Hotel>>(
      this.hotelApiUrl,
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          location: Optional.ofNullable(location).orElse(''),
          checkIn: Optional.ofNullable(checkIn).map(c => c.toISOString()).orElse(''),
          checkOut: Optional.ofNullable(checkOut).map(c => c.toISOString()).orElse(''),
          numberOfGuests: Optional.ofNullable(numberOfGuests).map(n => n.toString()).orElse('')
        }
      }
    );
  }

  public findMostBooked(
    page: number,
    size: number
  ): Observable<Page<Hotel>> {
    return this.http.get<Page<Hotel>>(
      `${this.hotelApiUrl}/most-booked`,
      {
        params: {
          page: page.toString(),
          size: size.toString()
        }
      }
    );
  }

  public findById(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.hotelApiUrl}/${id}`);
  }

  public findByUserId(userId: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.hotelApiUrl}/user/${userId}`);
  }

  public update(hotel: Hotel): Observable<void> {
    return this.http.put<void>(this.hotelApiUrl, hotel);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hotelApiUrl}/${id}`);
  }

}
