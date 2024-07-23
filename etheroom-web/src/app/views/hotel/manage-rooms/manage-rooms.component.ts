import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotelRoomService } from '../../../core/services/hotel-room.service';
import { HotelRoom } from '../../../core/models/hotel/aggregates/hotel-room.model';
import { Page } from '../../../core/types/types';
import { MatTable } from '@angular/material/table';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject } from 'rxjs';

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

  constructor(
    injector: Injector,
    public hotelRoomService: HotelRoomService
  ) {
    super(injector);
  }
  ngOnDestroy(): void {
    this.hotelRooms$.unsubscribe();
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  public handleButtonClick(): void {
    this.router.navigate(['hotel/manage-rooms/add-room']);
  }
  
  public onClickEdit(id: string): void {
    this.router.navigate([`hotel/manage-rooms/room-details/${id}`]);
  }

  public loadRooms(): void {
    this.loading.start();
    this.hotelRoomService.findAll(0, 10, null, null, null, null).subscribe({
      next: (paginator: Page<HotelRoom>) => {
        this.hotelRooms$.next(paginator?.content?.length > 0 ? paginator.content : null);
        this.loading.stop();
      },
      error: this.handleError
    })
  }
}
