import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'etheroom-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  public addressForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set addressForm(addressForm: FormGroup) {
    this.addressForm$.next(addressForm);
  }

}
