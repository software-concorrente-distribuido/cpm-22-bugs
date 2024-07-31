import { Component, Injector, OnInit } from '@angular/core';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { Enum, Page } from '../../../core/types/types';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { AddRoomDialogComponent } from '../../../shared/components/dialogs/add-room-dialog/add-room-dialog.component';
import { ApplicationService } from '../../../core/services/application.service';
import { EnumsNames } from '../../../core/data/enums';
import { Optional } from '../../../core/utils/optional';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ether-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.scss'
})
export class ManageRoomsComponent extends UtilComponent implements OnInit {

  protected override pageTitle: string;
  protected override pageDescription: string;
  
  public hotelRooms$: BehaviorSubject<HotelRoom[]> = new BehaviorSubject<HotelRoom[]>(null);
  public roomType$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);
  public filterForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public hotelId: string = '';

  constructor(
    private hotelRoomService: HotelRoomService,
    private autheticationService: AuthenticationService,
    private appService: ApplicationService,
    private fb: FormBuilder,
    injector: Injector,
  ) {
    super(injector);
  }

  private get roomType(): Enum[] {
    return this.roomType$.value;
  }

  public ngOnInit(): void {
    this.loadEnums();
    this.loadCurrentHotel();
  }

  public handleButtonClick(): void {
    this.router.navigate(['hotel/manage-rooms/add-room']);
  }
  
  public onClickView(id: string): void {
    this.router.navigate([`hotel/manage-rooms/room-details/${id}`]);
  }

  public onClickAddRoom(): void {
    this.openHotelRoomDialog();
  }

  public onClickEditRoom(hotelRoom: HotelRoom): void {
    this.openHotelRoomDialog(hotelRoom);
  }

  public applyFilter(): void {
    this.findAllRooms();
  }

  public clearFilter(): void {
    this.filterForm$.value.reset();
    this.findAllRooms();
  }

  public findRoomTypeDescription(type: string): string {
    return Optional.ofNullable(this.roomType)
      .map(roomType => roomType.find(roomType => roomType.name === type))
      .map(roomType => roomType.description)
      .orElse(null);
  }

  private loadCurrentHotel(): void {
    this.autheticationService.currentHotel().subscribe(
      (hotel: Hotel) => {
        this.hotelId = hotel?.id;
        this.createFilterForm(this.hotelId);
        this.findAllRooms();
      }
    );
  }

  private openHotelRoomDialog(hotelRoom: HotelRoom = null): void {
    this.dialog.open(AddRoomDialogComponent, {
      inputs: {
        hotelRoom: hotelRoom ?? HotelRoom.buildWithHotelId(this.hotelId),
      },
      onClose: (result: any) => 
        Optional.ofNullable(result)
          .ifPresent((hotelRoom) => this.handleRoomAddition(hotelRoom))
    });
  }

  private handleRoomAddition = (hotelRoom: HotelRoom): void => {
    Optional.ofNullable(hotelRoom)
      .filter((hr) => hr.id === null)
      .ifPresentOrElse(
        () => this.createHotelRoom(hotelRoom),
        () => this.updateHotelRoom(hotelRoom)
      )
  }

  private createHotelRoom(hotelRoom: HotelRoom): void {
    this.loading.start();
    this.hotelRoomService.create(hotelRoom)
      .subscribe({
        next: () => {
          this.snackbar.success('Hotel Room added successfully');
          this.findAllRooms();
        },
        error: this.handleError
      });
  }

  private updateHotelRoom(hotelRoom: HotelRoom): void {
    this.loading.start();
    this.hotelRoomService.update(hotelRoom)
      .subscribe({
        next: () => {
          this.snackbar.success('Hotel Room updated successfully');
          this.findAllRooms();
        },
        error: this.handleError
      });
  }

  private findAllRooms(): void {
    this.loading.start();
    const filterForm: FormGroup = this.filterForm$.value;
    if(filterForm.valid) {
      this.hotelRoomService.findAll(
        0,
        1000,
        filterForm.get('number').value,
        filterForm.get('type').value,
        filterForm.get('available').value,
        filterForm.get('hotelId').value
      )
      .subscribe({
        next: (page: Page<HotelRoom>) => {
          this.hotelRooms$.next(
            Optional.ofNullable(page.content)
              .filter((rooms) => rooms.length > 0)
              .orElse(null)
          );
          this.loading.stop();
        },
        error: this.handleError
      });
    } else {
      this.snackbar.info('Please fill in the required fields');
    }
  }

  private loadEnums(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_TYPE)
      .subscribe((enums: Enum[]) => this.roomType$.next(enums));
  }

  private createFilterForm(hotelId: string): void {
    this.filterForm$.next(
      this.fb.group({
        type: [null],
        available: [null],
        number: [null],
        hotelId: [hotelId]
      })
    );
  }

}
