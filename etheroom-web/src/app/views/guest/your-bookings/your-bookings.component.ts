import { Component, Injector, OnInit } from '@angular/core';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../../../core/models/booking/booking.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { Enum } from '../../../core/types/types';
import { ApplicationService } from '../../../core/services/application.service';
import { EnumsNames } from '../../../core/data/enums';
import { SharedModule } from '../../../shared/shared.module';
import { Optional } from '../../../core/utils/optional';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-your-bookings',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './your-bookings.component.html',
  styleUrls: ['./your-bookings.component.scss', '../../../../styles/global.scss']
})
export class YourBookingsComponent extends UtilComponent implements OnInit {

  private readonly DEFAULT_FILE_URL: string = './../../../../assets/images/example-hotel.svg';
  private readonly BASE_64_PREFIX: string = 'data:image/png;base64,';

  protected override pageTitle: string = 'Your Bookings';
  protected override pageDescription: string = 'View your bookings here';

  public bookings$: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>(null);

  public bookingStatus$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public filterForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public personId: string;

  constructor(
    private bookingService: BookingService,
    private enumService: ApplicationService,
    private fb: FormBuilder,
    injector: Injector
  ) { 
    super(injector);
  }

  public ngOnInit(): void {
    this.createFilterForm();
    this.loadPersonId();
    this.loadItens();
  }

  public findImgSrcByBase64(hotelRoom: HotelRoom): string {
    return Optional.ofNullable(hotelRoom)
      .map(h => h.thumbnail)
      .map((media) => media.data)
      .map((data: string) => this.BASE_64_PREFIX + data)
      .orElse(this.DEFAULT_FILE_URL);
  }

  public findBookingStatusDescriptionByName(name: string): string {
    return Optional.ofNullable(this.bookingStatus$.value)
      .map(status => status.find(s => s.name === name))
      .map(s => s.description)
      .orElse(null);
  }

  public applyFilter(): void {
    this.findBookings(this.filterForm$.value);
  }

  public clearFilter(): void {
    this.filterForm$.value.reset();
    this.findBookings(this.filterForm$.value);
  }

  private findBookings(filterForm: FormGroup): void {
    const filter = filterForm.value;
    this.bookingService.findAll(
      0,
      1000,
      null,
      filter.location,
      filter.checkIn,
      filter.checkOut,
      null,
      filter.status,
      filter.personId
    ).subscribe({
      next: bookings => this.bookings$.next(bookings.content),
      error: this.handleError
    })
  }

  private loadPersonId(): void {
    this.authenticationService.currentPerson()
    .subscribe(person => {
      this.personId = person.id;
      this.filterForm$.value.get('personId').setValue(this.personId);
      this.findBookings(this.filterForm$.value);
    });
  }

  private loadItens(): void {
    this.enumService.findEnumByName(EnumsNames.BOOKING_STATUS)
      .subscribe(bookingStatus => this.bookingStatus$.next(bookingStatus));
  }

  private createFilterForm(): void {
    this.filterForm$.next(this.fb.group({
      status: [null],
      location: [null],
      personId: [null],
      checkIn: [null],
      checkOut: [null]
    }));
  }

}
