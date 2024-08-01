import { Component, Injector, OnInit } from '@angular/core';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '../../../shared/components/forms/forms.module';
import { InputsModule } from '../../../shared/components/inputs/inputs.module';
import { ApplicationService } from '../../../core/services/application.service';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { EnumsNames } from '../../../core/data/enums';
import { Enum, Page } from '../../../core/types/types';
import { Optional } from '../../../core/utils/optional';
import { MatSelectModule } from '@angular/material/select';
import { EtherTableModule } from '../../../shared/components/ether-table/ether-table.module';
import { Booking } from '../../../core/models/booking/booking.model';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { BookingService } from '../../../core/services/booking.service';
import { PersonService } from '../../../core/services/person.service';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { createBookingForm, createHotelRoomForm } from '../../../core/utils/forms';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';

@Component({
  selector: 'ether-my-bookings',
  standalone: true,
  imports: [
    ButtonsModule,
    EtherFilterComponent,
    FormsModule,    
    EtherTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    InputsModule,
    RouterOutlet,
    PipesModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent extends UtilComponent implements OnInit {
  protected override pageTitle: string = 'My Bookings';
  protected override pageDescription: string = 'View and manage my bookings';

  public bookings$: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>(null);
  public bookingForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  public hotelRoom$: BehaviorSubject<HotelRoom> = new BehaviorSubject<HotelRoom>(null);
  public personForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  public filterForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  public hotel$: BehaviorSubject<Hotel> = new BehaviorSubject<Hotel>(null);
  public bookingStatus$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);
  public roomType$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public personName: string = '';

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private appService: ApplicationService,
    private bookingService: BookingService,
    private personService: PersonService,
    private hotelRoomService: HotelRoomService,
    private autheticationService: AuthenticationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadCurrentHotel();
  }

  public get bookingStatus(): Enum[] {
    return this.bookingStatus$.value;
  }

  public get roomType(): Enum[] {
    return this.roomType$.value;
  }

  public get filterForm(): FormGroup {
    return this.filterForm$.value;
  }

  public get hotel(): Hotel {
    return this.hotel$.value;
  }

  public get hotelRoom(): HotelRoom {
    return this.hotelRoom$.value;
  }

  public get personForm(): FormGroup {
    return this.personForm$.value;
  }

  public applyFilter(): void {
    this.findAllBookings();
  }

  public clearFilter(): void {
    this.filterForm.reset();
    this.findAllBookings();
  }

  public onClickView(): void {}

  public findBookingStatusDescription(type: string): string {
    return Optional.ofNullable(this.bookingStatus)
      .map(bookingStatus => bookingStatus.find(bookingStatus => bookingStatus.name === type))
      .map(bookingStatus => bookingStatus.description)
      .orElse(null);
  }

  public findRoomTypeDescription(type: string): string {
    return Optional.ofNullable(this.roomType)
      .map(roomType => roomType.find(roomType => roomType.name === type))
      .map(roomType => roomType.description)
      .orElse(null);
  }

  private loadItems(): void {
    this.appService.findEnumByName(EnumsNames.BOOKING_STATUS)
      .subscribe((enums: Enum[]) => this.bookingStatus$.next(enums));

    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_TYPE)
      .subscribe((enums: Enum[]) => this.roomType$.next(enums));
  }

  private findAllBookings(): void {
    this.loading.start();
    const filterForm: FormGroup = this.filterForm;
    if (filterForm.valid) {
      this.bookingService.findAll(
        0,
        1000,
        filterForm.get('checkIn').value,
        filterForm.get('checkOut').value,
        filterForm.get('roomNumber').value,
        filterForm.get('status').value,
        filterForm.get('personId').value,
        filterForm.get('hotelRoomId').value,
        filterForm.get('hotelId').value
      ).subscribe({
          next: (page: Page<Booking>) => {
            this.bookings$.next(
              Optional.ofNullable(page.content)
                .filter((bookings) => bookings.length > 0)
                .orElse(null)
            );
            this.loadRoomDetails();
            
            this.loadPersonName();
            this.loading.stop();
          },
          error: (error) => this.handleError(error)
        });
    } else {
      this.snackbar.info('Please fill in the required fields');
    }
  }

  private loadRoomDetails(): void {
    this.bookings$.value.forEach((booking: Booking) => {
      this.hotelRoomService.findById(booking?.hotelRoomId).subscribe({
        next: (hotelRoom) => {
          this.hotelRoom$.next(hotelRoom);
        },
        error: this.handleError
      });
    });
  }

  public findRoomNumber(hotelRoomId: string): number {
    this.hotelRoomService.findById(hotelRoomId).subscribe({
      next: (hotelRoom) => {
        this.hotelRoom$.next(hotelRoom);
      },
      error: this.handleError
    });

    return this.hotelRoom.number;
  }

  private loadPersonName(): void {
    this.bookings$.value.forEach((booking: Booking) => {
      this.personService.findById(booking?.personId).subscribe({
        next: (person) => {
          this.personName = person.name
        },
        error: this.handleError
      });
    });
  }

  private loadCurrentHotel(): void {
    this.autheticationService.currentHotel().subscribe(
      (hotel: Hotel) => {
        this.hotel$.next(hotel);
        this.createFilterForm(hotel?.id);
        this.findAllBookings();
      }
    );
  }

  private createFilterForm(hotelId: string): void {
    this.filterForm$.next(
      this.fb.group({
        checkIn: [null],
        checkOut: [null],
        roomNumber: [null],
        status: [null],
        personId: [null],
        hotelRoomId: [null],
        hotelId: [hotelId]
      })
    );
  }
}