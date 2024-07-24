import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'etheroom-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent {

  public personForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set personForm(value: FormGroup) {
    this.personForm$.next(value);
  }

  public get userForm(): FormGroup {
    return this.personForm$.value.get('user') as FormGroup;
  }

  public get contactForm(): FormGroup {
    return this.personForm$.value.get('contact') as FormGroup;
  }

  public get addressForm(): FormGroup {
    return this.personForm$.value.get('address') as FormGroup;
  }

}
