import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { Page } from '../../../core/types/types';
import { MatTable } from '@angular/material/table';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { AddRoomDialogComponent } from '../../../shared/components/dialogs/add-room-dialog/add-room-dialog.component';
import { FormGroup } from '@angular/forms';
import { createHotelRoomForm } from '../../../core/utils/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ether-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.scss'
})
export class ManageRoomsComponent extends UtilComponent implements OnInit {
  protected override pageTitle: string;
  protected override pageDescription: string;
  
  public hotelRooms$: BehaviorSubject<HotelRoom[]> = new BehaviorSubject(null);
  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  @ViewChild(MatTable)
  public table: MatTable<HotelRoom>;

  public hotelId: string = '';

  constructor(
    injector: Injector,
    public hotelRoomService: HotelRoomService,
    public dialog: MatDialog,
    public autheticationService: AuthenticationService
  ) {
    super(injector);
  }

  public get hotelRoomForm(): FormGroup {
    return this.hotelRoomForm$.value;
  }

  ngOnInit(): void {
    this.loadCurrentHotel();
    this.loadRooms();
  }

  private loadCurrentHotel(): Observable<Hotel> {
    return this.autheticationService.currentHotel().pipe(
      tap((hotel: Hotel) => {
        this.hotelId = hotel?.id;
      })
    );
  }

  public handleButtonClick(): void {
    this.router.navigate(['hotel/manage-rooms/add-room']);
  }
  
  public onClickEdit(id: string): void {
    this.router.navigate([`hotel/manage-rooms/room-details/${id}`]);
  }

  public onClickAddRoom(): void {
    this.createRoomForm().then(() => {
      this.openDialog();
    });
  }

  private handleRoomAddition = (bool: boolean): void => {
    if (bool) {
      this.hotelRoomService.create(this.hotelRoomForm.value)
    }
  }

  private openDialog(): void {
    this.dialog.open(AddRoomDialogComponent, {
      data: {
        hotelRoomForm: this.hotelRoomForm$.value,
      }
    }).afterClosed()
      .subscribe((bool: any) => this.handleRoomAddition(bool));
  }

  private async createRoomForm(): Promise<void> {
    const hotelRoom: HotelRoom = new HotelRoom();
    this.hotelRoomForm$.next(createHotelRoomForm(hotelRoom));
  }

  private loadRooms(): void {
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
