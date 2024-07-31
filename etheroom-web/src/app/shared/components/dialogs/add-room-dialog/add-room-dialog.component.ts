import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DialogsService } from '../dialogs.service';
import { createHotelRoomForm } from '../../../../core/utils/forms';
import { HotelRoom } from '../../../../core/models/hotel/aggregates/hotel-room.model';

@Component({
  selector: 'ether-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrl: './add-room-dialog.component.scss',
})
export class AddRoomDialogComponent {

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set hotelRoom(hotelRoom: HotelRoom) {
    this.hotelRoomForm$.next(createHotelRoomForm(hotelRoom));
  }

  constructor(
    private dialogsService: DialogsService
  ) {
  }

  public onSubmit(): void {
    this.dialogsService.close(this.hotelRoomForm$.value);
  }

  public onClose(): void {
    this.dialogsService.close();
  }

}
