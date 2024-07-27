import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { Page } from '../../../core/types/types';
import { MatTable } from '@angular/material/table';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Hotel } from '../../../core/models/hotel/hotel.model';

@Component({
  selector: 'ether-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.scss'
})
export class ManageRoomsComponent extends UtilComponent implements OnInit, OnDestroy {
  protected override pageTitle: string;
  protected override pageDescription: string;
  public hotelRooms$: BehaviorSubject<HotelRoom[]> = new BehaviorSubject(null);

  @ViewChild(MatTable)
  public table: MatTable<HotelRoom>;

  public hotelId: string = '';

  constructor(
    injector: Injector,
    public hotelRoomService: HotelRoomService,
    public autheticationService: AuthenticationService
  ) {
    super(injector);
  }
  
  ngOnDestroy(): void {
    this.hotelRooms$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadCurrentHotel();
    this.loadRooms();
  }

  private loadCurrentHotel(): Observable<Hotel> {
    return this.autheticationService.currentHotel().pipe(
      tap((hotel: Hotel) => {
        this.hotelId = hotel?.id;
        console.log(this.hotelId);
        console.log(hotel?.id);
        console.log(hotel);
      })
    )
  }

  public handleButtonClick(): void {
    this.router.navigate(['hotel/manage-rooms/add-room']);
  }
  
  public onClickEdit(id: string): void {
    this.router.navigate([`hotel/manage-rooms/room-details/${id}`]);
  }

  public loadRooms(): void {
    this.loading.start();
    this.loadCurrentHotel().pipe(
      switchMap(() => {
        console.log(this.hotelId);
        return this.hotelRoomService.findAll(0, 10, null, null, null, this.hotelId);
      })
    ).subscribe({
      next: (paginator: Page<HotelRoom>) => {
        const rooms: HotelRoom[] = paginator?.content;
        this.hotelRooms$.next(rooms?.length > 0 ? rooms : null);
        this.loading.stop();
      },

      error: this.handleError
    })
  }
}
