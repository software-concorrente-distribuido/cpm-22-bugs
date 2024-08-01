import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BookingService } from '../../../core/services/booking.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Enum } from '../../../core/types/types';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { Person } from '../../../core/models/person/person.model';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { ApplicationService } from '../../../core/services/application.service';
import { EnumsNames } from '../../../core/data/enums';
import { Booking } from '../../../core/models/booking/booking.model';
import { createBookingForm } from '../../../core/utils/forms';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { ConfirmationDialogComponent } from '../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { Optional } from '../../../core/utils/optional';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MediaModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent extends UtilComponent implements OnInit {

  private readonly HOTEL_ROOM_ID_KEY: string = 'hotelRoomId';
  private readonly BOOKING_ID_KEY: string = 'bookingId';

  protected override pageTitle: string = 'Booking';
  protected override pageDescription: string = 'Book a room in a hotel';

  public bookingForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  public hotel$: BehaviorSubject<Hotel> = new BehaviorSubject<Hotel>(null);
  public hotelRoom$: BehaviorSubject<HotelRoom> = new BehaviorSubject<HotelRoom>(null);

  public created: boolean = false;
  public updatable: boolean = false;
  public canBeCanceled: boolean = false;

  public readonly MIN_DATE: string = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));

  private conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);
  private roomTypes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  constructor(
    private bookingService: BookingService,
    private hotelService: HotelService,
    private hotelRoomService: HotelRoomService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    injector: Injector
  ) { 
    super(injector);
  }

  public get guestsFormArray(): FormArray {
    return this.bookingForm$.value.get('guests') as FormArray;
  }

  public ngOnInit(): void {
      this.loadItems();
      this.handleRouteData();
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

  public onClickCreate(): void {
    const formGroup: FormGroup = this.bookingForm$.value;
    if(formGroup.valid) {
      this.createBooking(formGroup.value);
    } else {
      this.snackbar.info("Please fill all fiels correctly");
      formGroup.markAllAsTouched();
    }
  }

  public onClickUpdate(): void {
    const formGroup: FormGroup = this.bookingForm$.value;
    if(formGroup.valid) {
      this.updateBooking(formGroup.value);
    } else {
      this.snackbar.info("Please fill all fiels correctly");
      formGroup.markAllAsTouched();
    }
  }

  public onClickCancel(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      inputs: {
        text: 'This action is irreversible. Are you sure you want to cancel this booking?'
      },
      onClose: (bool: any) => bool && this.cancelBooking()
    });
  }

  private createBooking(booking: Booking): void {
    this.bookingService.create(booking)
      .subscribe({
        next: (booking: Booking) => {
          this.snackbar.success("Booking created successfully");
          this.router.navigate([`/guest/booking`, { bookingId: booking.id }]);
        },
        error: this.handleError
      });
  }

  private updateBooking(booking: Booking): void {
    this.bookingService.update(booking)
      .subscribe({
        next: () => {
          this.snackbar.success("Booking updated successfully");
          this.bookingForm$.value.disable();
          this.updatable = false;
        },
        error: this.handleError
      });
  }

  private cancelBooking(): void {
    this.bookingService.cancel(this.bookingForm$.value.value.id)
      .subscribe({
        next: () => {
          this.snackbar.success("Booking canceled successfully");
          this.bookingForm$.value.disable();
          this.canBeCanceled = false;
        },
        error: this.handleError
      });
  }

  private handleRouteData(): void {
    this.route.paramMap.subscribe({
      next: (map: ParamMap) => {
        const bookingId: string = map.get(this.BOOKING_ID_KEY);
        if(bookingId) {
          this.findBookingById(bookingId);
        } else {
          const hotelRoomId: string = map.get(this.HOTEL_ROOM_ID_KEY);
          this.createBookingForm();
          this.findHotelRoomById(hotelRoomId);
        }
      },
      error: this.handleError
    });
  }

  private findBookingById(id: string): void {
    this.bookingService.findById(id)
      .subscribe({
        next: (booking: Booking) => {
          this.createBookingForm(booking);
          this.findHotelRoomById(booking.hotelRoomId);
          this.created = true;
          this.updatable = booking.status === 'STARTED';
          this.canBeCanceled = booking.status === 'ACTIVE';
        },
        error: this.handleError
      });
  }

  private findHotelRoomById(id: string): void {
    this.hotelRoomService.findById(id)
      .subscribe({
        next: (hotelRoom: HotelRoom) => {
          this.hotelRoom$.next(hotelRoom);
          this.bookingForm$.value.get('hotelRoomId').setValue(id);
          this.loadPerson();
          this.findHotelById(hotelRoom.hotelId);
        },
        error: this.handleError
      });
  }

  private findHotelById(id: string): void {
    this.hotelService.findById(id)
      .subscribe({
        next: (hotel: Hotel) => this.hotel$.next(hotel),
        error: this.handleError
      });
  }

  private loadPerson(): void {
    this.authenticationService.currentPerson()
      .subscribe({
        next: (person: Person) => this.bookingForm$.value.get('personId').setValue(person.id),
        error: this.handleError
      })
  }

  private loadItems(): void {
    this.applicationService.findEnumByName(EnumsNames.HOTEL_ROOM_CONVENIENCE)
      .subscribe((conveniences: Enum[]) => this.conveniences$.next(conveniences));
    this.applicationService.findEnumByName(EnumsNames.HOTEL_ROOM_TYPE);
  }

  private createBookingForm(booking: Booking = null): void {
    this.bookingForm$.next(createBookingForm(booking));
  }

}
