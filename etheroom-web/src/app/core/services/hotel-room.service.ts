import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HotelRoom } from '../models/hotel/aggregates/hotel-room.model';
import { Observable } from 'rxjs';
import { Page } from '../types/types';
import { Optional } from '../utils/optional';

@Injectable({
  providedIn: 'root'
})
export class HotelRoomService {

  private hotelRoomApiUrl: string;

  private readonly HOTEL_ROOM_PATH = 'hotel-room';

  constructor(
    private http: HttpClient
  ) {
    this.hotelRoomApiUrl = `${environment.apiUrl}/${this.HOTEL_ROOM_PATH}`;
  }

  public create(hotelRoom: HotelRoom): Observable<HotelRoom> {
    return this.http.post<HotelRoom>(this.hotelRoomApiUrl, hotelRoom);
  }

  public findAll(
    page: number,
    size: number,
    number: number,
    type: string,
    available: boolean,
    hotelId: string
  ): Observable<Page<HotelRoom>> {
    return this.http.get<Page<HotelRoom>>(
      this.hotelRoomApiUrl,
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          number: Optional.ofNullable(number).map(n => n.toString()).orElse(''),
          type: Optional.ofNullable(type).orElse(''),
          available: Optional.ofNullable(available).map(a => a.toString()).orElse(''),
          hotelId: Optional.ofNullable(hotelId).orElse('')
        }
      }
    );
  }

  public findAllAvailable(
    page: number,
    size: number,
    number: number = null,
    type: string = null,
    hotelId: string = null
  ): Observable<Page<HotelRoom>> {
    return this.http.get<Page<HotelRoom>>(
      `${this.hotelRoomApiUrl}/available`,
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          number: Optional.ofNullable(number).map(n => n.toString()).orElse(''),
          type: Optional.ofNullable(type).orElse(''),
          hotelId: Optional.ofNullable(hotelId).orElse('')
        }
      }
    );
  }

  public findById(id: string): Observable<HotelRoom> {
    return this.http.get<HotelRoom>(`${this.hotelRoomApiUrl}/${id}`);
  }

  public isHotelRoomBooked(id: string, checkIn: Date, checkOut: Date): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.hotelRoomApiUrl}/${id}/booked`, 
      {
        params: {
          checkIn: Optional.ofNullable(checkIn).map(c => c.toISOString()).orElse(''),
          checkOut: Optional.ofNullable(checkOut).map(c => c.toISOString()).orElse('')
        }
      }
    );
  }

  public update(hotelRoom: HotelRoom): Observable<void> {
    return this.http.put<void>(this.hotelRoomApiUrl, hotelRoom);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hotelRoomApiUrl}/${id}`);
  }

}
