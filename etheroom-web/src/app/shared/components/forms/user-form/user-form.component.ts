import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Optional } from '../../../../core/utils/optional';

@Component({
  selector: 'etheroom-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  public userForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public isRegistered: boolean = false;

  @Input() 
  public set userForm(value: FormGroup) {
    this.isRegistered = Optional.ofNullable(value.get('id').value).isPresent();
    this.userForm$.next(value);
  }

}
