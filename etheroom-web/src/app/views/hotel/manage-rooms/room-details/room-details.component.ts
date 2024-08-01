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

import { DialogsService } from '../../../../shared/components/dialogs/dialogs.service';
import { Web3Service } from '../../../../core/services/web3.service';


@Component({
  selector: 'ether-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
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

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  public hotelForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  public roomType$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);
  public todayDate: string;

  private isBookingInProgress = false;


  constructor(
    private hotelRoomService: HotelRoomService,
    private appService: ApplicationService,
    private hotelService: HotelService,
    private route: ActivatedRoute,

    private fb: FormBuilder,
    injector: Injector,

    public web3: Web3Service

  ) {
    super(injector);
    this.isPerson = this.authenticationService.isCurrentUserPerson();
  }
  
  ngOnInit(): void {

    this.onInit();
    this.createAvailabilityFormGroup();

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.todayDate = `${year}-${month}-${day}`;
    console.log(this.todayDate);

    this.getRouteData();

    this.loadItems();
    this.getRouteData();
  }


  public get hotelForm(): FormGroup {
    return this.hotelForm$.value;
  }

  public get addressForm(): FormGroup {
    return this.hotelForm.get('address') as FormGroup;
  }

  private get hotelRoomForm(): FormGroup {
    return this.hotelRoomForm$.value;
  }

  public get roomTypes(): Enum[] {
    return this.roomType$.value;
  }

  public get roomConveniences(): FormArray {
    return this.hotelRoomForm.get('conveniences') as FormArray;
  }

  public get imagesControl(): FormControl {
    return this.hotelRoomForm.get('images') as FormControl;
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
      this.router.navigate(['guest/booking', { hotelRoomId: this.hotelRoom$.value.id }]);
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
        }}}}}

  private findHotelRoomById(id: string): void {
    this.loading.start();
    this.hotelRoomService.findById(id).subscribe({
      next: (hotelRoom: HotelRoom) => {
        console.log(hotelRoom);
        this.hotelRoomForm$.next(createHotelRoomForm(hotelRoom));
        this.findHotelById(hotelRoom.hotelId);
        this.loading.stop();

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

  public async createBooking() {
    if (this.isBookingInProgress) {
      alert("Uma reserva já está em andamento. Por favor, aguarde.");
      return;
    }

    this.isBookingInProgress = true;
    
    this.web3.isConnected();

    //SUBSTITUIR PELOS VALORES DINÂMICOS
    const checkinDate = '2024-07-31';
    const checkoutDate = '2024-08-10';
    const dailyRate = 0.16;
    const hotelName = 'NOME DO HOTEL';
    const roomNumber = 603;

    if (checkinDate && checkoutDate) {
      try {
        const finalPrice = this.calculatePrice(checkinDate, checkoutDate, dailyRate);

        const id = await this.web3.createBooking(hotelName, finalPrice, checkinDate, checkoutDate, roomNumber, '0x80524E6e4644eFc240BCd03adE126bBe6E7CbB79');
        const booking = await this.web3.getBooking(id);
        await this.web3.startBooking(id, this.todayDate);
        console.log(booking);

        alert("Reserva criada! ID: " + id);
      } catch (error) {
        console.error("Erro ao criar reserva:", error);
        alert("Falha ao criar reserva.");
      } finally {
        this.isBookingInProgress = false;
      }
    } else {
      alert("Por favor, selecione as datas de check-in e check-out.");
      this.isBookingInProgress = false;
    }
  }

  private calculateDays(checkinDate: string, checkoutDate: string): number {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const timeDifference = checkout.getTime() - checkin.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return dayDifference;
  }

  private calculatePrice(checkinDate: string, checkoutDate: string, dailyRate: number): number {
    const numberOfDays = this.calculateDays(checkinDate, checkoutDate);
    return numberOfDays * dailyRate;
  }
}
