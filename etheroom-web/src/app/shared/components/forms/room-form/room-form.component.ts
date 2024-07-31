import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Enum } from '../../../../core/types/types';
import { Optional } from '../../../../core/utils/optional';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';
import { createConvenienceForm } from '../../../../core/utils/forms';

@Component({
  selector: 'ether-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
  host: {
    class: 'ether-room-form'
  }
})
export class RoomFormComponent implements OnInit {

  public hotelRoomForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public convenienceForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public roomType$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public isAvailable: boolean = false;

  @Input()
  public set hotelRoomForm(value: FormGroup) {
    this.isAvailable = Optional.ofNullable(value.get('id').value).isPresent();
    this.hotelRoomForm$.next(value);
  }

  constructor(private appService: ApplicationService) {}  
  
  ngOnInit(): void {
    this.loadEnums();
  }

  public get hotelRoomForm(): FormGroup {
    return this.hotelRoomForm$.value;
  }

  public get convenienceForm(): FormGroup {
    return this.convenienceForm$.value;
  }
  
  public get convenienceFormArray(): FormArray {
    return this.hotelRoomForm.get('conveniences') as FormArray;
  }

  public get conveniences(): Enum[] {
    return this.conveniences$.value;
  }

  public get roomTypes(): Enum[] {
    return this.roomType$.value;
  }

  public get thumbnailControl(): FormControl {
    return this.hotelRoomForm.get('thumbnail') as FormControl;
  }

  public get imagesControl(): FormControl {
    return this.hotelRoomForm.get('images') as FormControl;
  }

  public addConvenience(): void {
    this.convenienceFormArray.push(createConvenienceForm());
  }

  public removeConvenience(index: number): void {
    this.convenienceFormArray.removeAt(index);
  }

  public findConvenienceDescription(type: string): string {
    return Optional.ofNullable(this.conveniences)
      .map(convenience => convenience.find(convenience => convenience.name === type))
      .map(convenience => convenience.description)
      .orElse(null);
  }

  public findRoomTypeDescription(type: string): string {
    return Optional.ofNullable(this.roomTypes)
      .map(roomType => roomType.find(roomType => roomType.name === type))
      .map(roomType => roomType.description)
      .orElse(null);
  }

  private loadEnums(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_CONVENIENCE)
      .subscribe((enums: Enum[]) => this.conveniences$.next(enums));

    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_TYPE)
      .subscribe((enums: Enum[]) => this.roomType$.next(enums));
  }

}
