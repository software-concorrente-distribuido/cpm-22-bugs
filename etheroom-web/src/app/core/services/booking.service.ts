import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Booking } from '../models/booking/booking.model';
import { Observable } from 'rxjs';
import { Optional } from '../utils/optional';
import { Page } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingApiUrl: string;

  private readonly BOOKING_PATH = 'booking';

  constructor(
    private http: HttpClient
  ) {
    this.bookingApiUrl = `${environment.apiUrl}/${this.BOOKING_PATH}`;
  }

  public create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingApiUrl, booking);
  }

  public findAll(
    page: number,
    size: number,
    checkIn: Date = null,
    checkOut: Date = null,
    roomNumber: number = null,
    status: string = null,
    personId: string = null,
    hotelRoomId: string = null,
    hotelId: string = null
  ): Observable<Page<Booking>> {
    return this.http.get<Page<Booking>>(
      this.bookingApiUrl,
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          checkIn: Optional.ofNullable(checkIn).map(c => c.toISOString()).orElse(''),
          checkOut: Optional.ofNullable(checkOut).map(c => c.toISOString()).orElse(''),
          roomNumber: Optional.ofNullable(roomNumber).map(r => r.toString()).orElse(''),
          status: Optional.ofNullable(status).orElse(''),
          personId: Optional.ofNullable(personId).orElse(''),
          hotelRoomId: Optional.ofNullable(hotelRoomId).orElse(''),
          hotelId: Optional.ofNullable(hotelId).orElse('')
        }
      }
    );
  }

  public findById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.bookingApiUrl}/${id}`);
  }

  public update(booking: Booking): Observable<void> {
    return this.http.put<void>(this.bookingApiUrl, booking);
  }

  public cancel(id: string): Observable<void> {
    return this.http.put<void>(`${this.bookingApiUrl}/cancel/${id}`, null);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.bookingApiUrl}/${id}`);
  }

}
