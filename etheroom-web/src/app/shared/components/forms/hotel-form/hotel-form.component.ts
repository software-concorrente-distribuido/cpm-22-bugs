import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Optional } from '../../../../core/utils/optional';

@Component({
  selector: 'etheroom-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss',
  host: {
    class: 'etheroom-hotel-form'
  }
})
export class HotelFormComponent {

  public hotelForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set hotelForm(value: FormGroup) {
    this.hotelForm$.next(value);
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

}
