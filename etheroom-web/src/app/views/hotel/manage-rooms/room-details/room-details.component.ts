import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UtilComponent } from '../../../../shared/components/util/util.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HotelRoomService } from '../../../../core/services/hotel-room.service';
import { Optional } from '../../../../core/utils/optional';
import { HotelRoom } from '../../../../core/models/hotel/aggregates/hotel-room.model';
import { createHotelForm, createHotelRoomForm } from '../../../../core/utils/forms';
import { Functions } from '../../../../core/utils/functions';
import { ConfirmationDialogComponent } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HotelService } from '../../../../core/services/hotel.service';
import { Hotel } from '../../../../core/models/hotel/hotel.model';
import { Convenience } from '../../../../core/models/hotel/aggregates/convenience.model';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';
import { Enum } from '../../../../core/types/types';
import { DialogsService } from '../../../../shared/components/dialogs/dialogs.service';

@Component({
  selector: 'ether-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent extends UtilComponent implements OnInit {
  protected override pageTitle: string;
  protected override pageDescription: string;

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  public hotelForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  public conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject(null);
  public roomType$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  constructor(
    injector: Injector,
    private hotelRoomService: HotelRoomService,
    private appService: ApplicationService,
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.getRouteData();
    this.loadItems();
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

  // public get roomType() {
  //   return this.hotelRoomForm.get('type');
  // }

  public findConvenienceDescription(type: string): string {
    return Optional.ofNullable(this.conveniences$.value)
      .map(conveniences => conveniences.find(convenience => convenience.name === type))
      .map(convenience => convenience.description)
      .orElse(null);
  }

  public findRoomTypeDescription(type: string): string {
    return Optional.ofNullable(this.roomTypes)
      .map(roomType => roomType.find(roomType => roomType.name === type))
      .map(roomType => roomType.description)
      .orElse(null);
  }

  public onClickUpdate(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      inputs: {
        text: 'Deseja realmente salvar as alterações?'
      },
      onClose: (bool: any) => this.handleUpdateConfirmation(bool)
    });
  }

  public onClickDelete(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      inputs: {
        text: 'Deseja realmente deletar este quarto?'
      },
      onClose: (bool: any) => this.handleDeletionConfirmation(bool)
    })
  }

  private updateRoom(): void {
    this.hotelRoomService.update(this.hotelRoomForm.value)
      .subscribe({
        next: () => {
          this.snackbar.success('Quarto atualizado com sucesso');
          this.loading.stop();
        },
        error: this.handleError
      });
  }

  private deleteHotelRoom(): void {
    this.loading.start();
    this.hotelRoomService.delete(this.hotelRoomForm.get('id').value)
      .subscribe({
        next: () => {
          this.snackbar.success('Quarto deletado com sucesso');
          this.loading.stop();
          this.router.navigate(['hotel/manage-rooms']);
        },
        error: this.handleError
      });
  }

  private handleUpdateConfirmation(bool: any): void {
    Optional.ofNullable(bool)
      .ifPresent(() => {
        Functions.acceptTrueOrElse(
          this.hotelRoomForm.valid,
          () => this.updateRoom(),
          () => this.snackbar.error('Formulário inválido')
        );
      });
  }

  private handleDeletionConfirmation = (bool: any): void => {
    Optional.ofNullable(bool)
      .ifPresent(() => this.deleteHotelRoom());
  }

  private getRouteData(): void {
    this.loading.start();
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
        () => {
          this.findHotelRoomById(id);
          this.loading.stop();
        },
        () => {
          this.router.navigate(['hotel/manage-rooms']);
          this.loading.stop();
        }
      );
  }

  private findHotelById(hotelId: string): void {
    this.loading.start();
    this.hotelService.findById(hotelId).subscribe({
      next: (hotel) => {
        this.hotelForm$.next(createHotelForm(hotel));
        this.loading.stop();
      },
      error: this.handleError
    });
  }

  private findHotelRoomById(id: string): void {
    this.loading.start();
    this.hotelRoomService.findById(id).subscribe({
      next: (hotelRoom: HotelRoom) => {
        console.log(hotelRoom);
        this.hotelRoomForm$.next(createHotelRoomForm(hotelRoom));
        // this.hotelRoom$.next(hotelRoom);
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
  }

}
