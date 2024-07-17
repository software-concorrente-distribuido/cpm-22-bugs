import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Enum } from '../../../../core/types/types';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';
import { createConvenienceForm, createTouristSpotForm } from '../../../../core/utils/forms';
import { Optional } from '../../../../core/utils/optional';

@Component({
  selector: 'etheroom-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss'
})
export class HotelFormComponent implements OnInit {

  public hotelForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public isRegistered: boolean = false;

  @Input()
  public set hotelForm(value: FormGroup) {
    this.isRegistered = Optional.ofNullable(value.get('id').value).isPresent();
    this.hotelForm$.next(value);
  }

  constructor(
    private appService: ApplicationService
  ) {
  }

  public ngOnInit(): void {
    this.loadEnums();
  }

  public get userForm(): FormGroup {
    return this.hotelForm$.value.get('user') as FormGroup;
  }

  public get contactForm(): FormGroup {
    return this.hotelForm$.value.get('contact') as FormGroup;
  }

  public get addressForm(): FormGroup {
    return this.hotelForm$.value.get('address') as FormGroup;
  }

  public get convenienceFormArray(): FormArray {
    return this.hotelForm$.value.get('conveniences') as FormArray;
  }

  public get touristSpotFormArray(): FormArray {
    return this.hotelForm$.value.get('touristSpots') as FormArray;
  }

  public get thumbnailControl(): FormControl {
    return this.hotelForm$.value.get('thumbnail') as FormControl;
  }

  public get imagesControl(): FormControl {
    return this.hotelForm$.value.get('images') as FormControl;
  }

  public addConvenience(): void {
    this.convenienceFormArray.push(createConvenienceForm());
  }

  public removeConvenience(index: number): void {
    this.convenienceFormArray.removeAt(index);
  }

  public addTouristSpot(): void {
    this.touristSpotFormArray.push(createTouristSpotForm());
  }

  public removeTouristSpot(index: number): void {
    this.touristSpotFormArray.removeAt(index);
  }

  private loadEnums(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_CONVENIENCE)
      .subscribe((enums: Enum[]) => this.conveniences$.next(enums));
  }

}
