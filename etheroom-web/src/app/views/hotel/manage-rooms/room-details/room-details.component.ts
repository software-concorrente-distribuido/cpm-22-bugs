import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UtilComponent } from '../../../../shared/components/util/util.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HotelRoomService } from '../../../../core/services/hotel-room.service';
import { Optional } from '../../../../core/utils/optional';
import { HotelRoom } from '../../../../core/models/hotel/aggregates/hotel-room.model';
import { createHotelRoomForm } from '../../../../core/utils/forms';
import { Functions } from '../../../../core/utils/functions';
import { ConfirmationDialogComponent } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HotelService } from '../../../../core/services/hotel.service';
import { Hotel } from '../../../../core/models/hotel/hotel.model';
import { Convenience } from '../../../../core/models/hotel/aggregates/convenience.model';

@Component({
  selector: 'ether-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent extends UtilComponent implements OnInit, OnDestroy {
  protected override pageTitle: string;
  protected override pageDescription: string;

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  public newHotelRoom$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public hotelId: string;
  public hotel: Hotel;

  constructor(
    injector: Injector,
    private hotelRoomService: HotelRoomService,
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.getRouteData();
  }

  ngOnDestroy(): void {
    this.hotelRoomForm$.unsubscribe();
    this.newHotelRoom$.unsubscribe();
  }

  public get roomConveniences(): Convenience[] {
    return this.hotelRoomForm.get('conveniences').value;
  }

  public onSave(): void {
    Functions.acceptTrueOrElse(
      this.hotelRoomForm.valid,
      () => this.saveHotelRoom(),
      () => this.snackbar.error('Formulário inválido')
    );
  }

  public onClickDelete(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      inputs: {
        text: 'Deseja realmente deletar este quarto?'
      },
      onClose: (bool: any) => this.handleDeletionConfirmation(bool)
    })
  }

  private get hotelRoomForm(): FormGroup {
    return this.hotelRoomForm$.value;
  }

  private saveHotelRoom(): void {
    this.loading.start();
    const id: string = this.hotelRoomForm.get('id').value;
    Optional.ofNullable(id)
      .ifPresentOrElse(
        () => this.updateRoom(),
        () => this.createRoom()
      );
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

  private createRoom(): void {
    this.hotelRoomService.create(this.hotelRoomForm.value)
      .subscribe({
        next: (hotelRoom: HotelRoom) => {
          this.snackbar.success('Quarto criado com sucesso');
          this.loading.stop();
          this.router.navigate([`hotel/manage-rooms/room-details/${hotelRoom.id}`]);
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

  private handleDeletionConfirmation = (bool: any): void => {
    Optional.ofNullable(bool)
      .ifPresent(() => this.deleteHotelRoom());
  }

  private createRoomForm(hotelRoom: HotelRoom = new HotelRoom()): void {
    this.hotelRoomForm$.next(
      createHotelRoomForm(hotelRoom)
    );
  }

  private findHotelRoomById(id: string): void {
    this.loading.start();
    this.hotelRoomService.findById(id).subscribe({
      next: (hotelRoom: HotelRoom) => {
        this.createRoomForm(hotelRoom);
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
        this.hotel = hotel;
      },
      error: this.handleError
    });
  }

  private handleRetrievedHotelRoomId(id: string): void {
    Optional.ofNullable(id)
      .ifPresentOrElse(
        () => {
          this.newHotelRoom$.next(false);
          this.findHotelRoomById(id);
          this.loading.stop();
        },
        () => {
          this.createRoomForm();
          this.loading.stop();
        }
      );
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

}
