import { Component, Injector, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';
import { Enum, Page } from '../../../core/types/types';
import { ApplicationService } from '../../../core/services/application.service';
import { EnumsNames } from '../../../core/data/enums';
import { ManageRoomModule } from "../../hotel/manage-rooms/manage-room.module";
import { EtherFilterComponent } from "../../../shared/components/filter/ether-filter.component";
import { CommonModule } from '@angular/common';
import { Optional } from '../../../core/utils/optional';
import { EtherIconTextComponent } from "../../../shared/components/ether-icon-text/ether-icon-text.component";
import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';
import { MatDialog } from '@angular/material/dialog';
import { HotelRoomsPopupComponent } from '../../../shared/components/hotel-rooms-popup/hotel-rooms-popup.component';
import { HotelRoomService } from '../../../core/services/hotel-room.service';

@Component({
  selector: 'ether-all-hotels',
  standalone: true,
  templateUrl: './all-hotels.component.html',
  imports: [
    ManageRoomModule,
    EtherFilterComponent,
    CommonModule,
    EtherIconTextComponent,
    ButtonsModule
  ],
  styleUrls: ['./all-hotels.component.scss']
})
export class AllHotelsComponent extends UtilComponent implements OnInit {

  protected override pageTitle: string = 'All Hotels';
  protected override pageDescription: string = 'Find the best hotels in the world';

  public hotels$: BehaviorSubject<Hotel[]> = new BehaviorSubject(null);
  public hotelConveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject(null);

  constructor (
    injector: Injector,
    private hotelService: HotelService,
    private appService: ApplicationService,
    public dialog: MatDialog,
    public hotelRoomService: HotelRoomService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadHotels();
    this.loadEnums();
  }

  openRoomsDialog(hotelId: string): void {
    this.hotelRoomService.findAllAvailable(0, 10, null, null, hotelId).subscribe(response => {
      this.dialog.open(HotelRoomsPopupComponent, {
        width: '600px',
        data: { rooms: response.content }
      });
    });
  }

  public seeAvailabilityButton(): void {
    this.router.navigate(['/room-page']);
  }

  public findConvenienceDescription(type: string): string {
    return Optional.ofNullable(this.hotelConveniences$.value)
      .map(conveniences => conveniences.find(convenience => convenience.name === type))
      .map(convenience => convenience.description)
      .orElse(null);
  }

  private loadHotels(): void {
    this.loading.start();
    this.hotelService.findAll(0, 10, null, null).subscribe({
      next: (paginator: Page<Hotel>) => {
        const hotels: Hotel[] = paginator.content;
        this.hotels$.next(hotels?.length > 0 ? hotels : null);
        this.loading.stop();
      },
      error: (error: any) => this.handleError(error),
    });
  }

  private loadEnums(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_CONVENIENCE)
      .subscribe((enums: Enum[]) => this.hotelConveniences$.next(enums));
  }
}
