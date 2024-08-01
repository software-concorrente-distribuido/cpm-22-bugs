import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { createGuestForm } from '../../../../core/utils/forms';

@Component({
  selector: 'ether-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrl: './guest-form.component.scss',
  host: {
    class: 'ether-guest-form'
  }
})
export class GuestFormComponent {

  public guestFormArray$: BehaviorSubject<FormArray> = new BehaviorSubject<FormArray>(null);

  @Input()
  public set guestForm(value: FormArray) {
    this.guestFormArray$.next(value);
  }

  public get guestFormArray(): FormArray {
    return this.guestFormArray$.value;
  }

  public castAbstractToFormGroup(abstract: AbstractControl): FormGroup {
    return abstract as FormGroup;
  }

  public addGuest(): void {
    this.guestFormArray.push(createGuestForm());
  }

  public removeGuest(index: number): void {
    this.guestFormArray.removeAt(index);
  }

}
