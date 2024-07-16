import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'etheroom-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  public userForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input() 
  public set userForm(value: FormGroup) {
    this.userForm$.next(value);
  }

}
