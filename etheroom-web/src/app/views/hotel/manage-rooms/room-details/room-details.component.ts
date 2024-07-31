import { Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilComponent } from '../../../../shared/components/util/util.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HotelRoomService } from '../../../../core/services/hotel-room.service';
import { Optional } from '../../../../core/utils/optional';
import { HotelRoom } from '../../../../core/models/hotel/aggregates/hotel-room.model';
import { HotelService } from '../../../../core/services/hotel.service';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';
import { Availability, Enum } from '../../../../core/types/types';
import { Hotel } from '../../../../core/models/hotel/hotel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ether-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent extends UtilComponent implements OnInit {

  protected override pageTitle: string = 'Hotel Room Details';
  protected override pageDescription: string = 'View hotel room details';

  public isPerson: boolean = true;
  public available: boolean = false;

  public hotel$: BehaviorSubject<Hotel> = new BehaviorSubject(null);
  public hotelRoom$: BehaviorSubject<HotelRoom> = new BehaviorSubject(null);
  public availabilityFormGroup$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  public readonly MIN_DATE: string = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));

  private conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject(null);
  private roomTypes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  constructor(
    private hotelRoomService: HotelRoomService,
    private appService: ApplicationService,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    injector: Injector
  ) {
    super(injector);
    this.isPerson = this.authenticationService.isCurrentUserPerson();
  }
  
  ngOnInit(): void {
    this.onInit();
    this.createAvailabilityFormGroup();
    this.loadItems();
    this.getRouteData();
  }

  public findConvenienceDescription(type: string): string {
    return Optional.ofNullable(this.conveniences$.value)
      .map(conveniences => conveniences.find(convenience => convenience.name === type))
      .map(convenience => convenience.description)
      .orElse(null);
  }

  public findRoomTypeDescription(type: string): string {
    return Optional.ofNullable(this.roomTypes$.value)
      .map(roomType => roomType.find(roomType => roomType.name === type))
      .map(roomType => roomType.description)
      .orElse(null);
  }

  public onCheckAvailability(): void {
    const availability: FormGroup = this.availabilityFormGroup$.value;
    if(availability.valid) {
      this.checkAvailability(availability.value);
    } else {
      this.snackbar.info('Please fill all form fields');
    }
  }

  public startBooking(): void {
    if(this.available && this.isPerson) {
      this.router.navigate(['guest/booked-room', { hotelRoomId: this.hotelRoom$.value.id }]);
    } else {
      this.snackbar.info('Requirements for booking not met');
    }
  }

  private getRouteData(): void {
    this.route.paramMap.subscribe({
      next: (map: ParamMap) => {
        this.handleRetrievedHotelRoomId(map.get('id'));
      },
      error: () => {
        this.snackbar.error('Erro ao recuperar dados da rota');
      }
    });
  }

  private handleRetrievedHotelRoomId(id: string): void {
    Optional.ofNullable(id)
      .ifPresentOrElse(
        () => this.findHotelRoomById(id),
        () => {
          this.snackbar.info('Hotel Room not found');
          this.router.navigate(['hotel/manage-rooms']);
        }
      );
  }

  private findHotelRoomById(id: string): void {
    this.loading.start();
    this.hotelRoomService.findById(id).subscribe({
      next: (hotelRoom: HotelRoom) => {
        this.hotelRoom$.next(hotelRoom);
        this.availabilityFormGroup$.value.get('hotelRoomId').setValue(hotelRoom.id);
        this.findHotelById(hotelRoom.hotelId);
        this.loading.stop();
      },
      error: this.handleError
    });
  }

  private findHotelById(hotelId: string): void {
    this.loading.start();
    this.hotelService.findById(hotelId).subscribe({
      next: (hotel) => {
        this.hotel$.next(hotel);
        this.loading.stop();
      },
      error: this.handleError
    });
  }

  private checkAvailability(availability: Availability): void {
    this.hotelRoomService.isHotelRoomBooked(
      availability.hotelRoomId,
      availability.checkIn,
      availability.checkOut
    ).subscribe({
      next: (isBooked: boolean) => {
        if(isBooked) {
          this.snackbar.info('Room is not available for the selected period');
        } else {
          this.available = true;
          this.snackbar.info('Room is available for the selected period');
        }
      },
      error: this.handleError
    });
  }

  private loadItems(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_CONVENIENCE).subscribe(
      (conveniences: Enum[]) => this.conveniences$.next(conveniences)
    );
    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_TYPE).subscribe(
      (roomTypes: Enum[]) => this.roomTypes$.next(roomTypes)
    );
  }

  private createAvailabilityFormGroup(): void {
    this.availabilityFormGroup$.next(
      this.fb.group({
        hotelRoomId: [null, [Validators.required]],
        checkIn: [null, [Validators.required]],
        checkOut: [null, [Validators.required]]
      })
    );
  }

}
