import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Optional } from '../../../../core/utils/optional';

@Component({
  selector: 'etheroom-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  public userForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public profilePictureControl$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  @Input() 
  public set userForm(value: FormGroup) {
    this.profilePictureControl$.next(
      Optional.of(value.get('profilePicture'))
              .map(control => control as FormControl)
              .orElse(null)
    );
    this.userForm$.next(value);
  }

}
