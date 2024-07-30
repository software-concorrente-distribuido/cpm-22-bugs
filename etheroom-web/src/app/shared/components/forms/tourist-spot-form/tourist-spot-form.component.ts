import { Component, Input } from '@angular/core';
import { createTouristSpotForm } from '../../../../core/utils/forms';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'ether-tourist-spot-form',
  templateUrl: './tourist-spot-form.component.html',
  styleUrl: './tourist-spot-form.component.scss',
  host: {
    class: 'ether-tourist-spot-form'
  }
})
export class TouristSpotFormComponent {

  public touristSpotFormArray$: BehaviorSubject<FormArray> = new BehaviorSubject<FormArray>(null);

  @Input()
  public set touristSpotForm(value: FormArray) {
    this.touristSpotFormArray$.next(value);
  }

  public get touristSpotFormArray(): FormArray {
    return this.touristSpotFormArray$.value;
  }

  public castAbstractToFormGroup(abstract: AbstractControl): FormGroup {
    return abstract as FormGroup;
  }

  public addTouristSpot(): void {
    this.touristSpotFormArray.push(createTouristSpotForm());
  }

  public removeTouristSpot(index: number): void {
    this.touristSpotFormArray.removeAt(index);
  }

}
