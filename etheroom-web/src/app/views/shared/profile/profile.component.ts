import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { Person } from '../../../core/models/person/person.model';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { createHotelForm, createPersonForm } from '../../../core/utils/forms';
import { Optional } from '../../../core/utils/optional';
import { PersonService } from '../../../core/services/person.service';
import { HotelService } from '../../../core/services/hotel.service';
import { FormsModule } from '../../../shared/components/forms/forms.module';
import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';

@Component({
  selector: 'ether-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends UtilComponent implements OnInit {

  protected override pageTitle: string = 'My Profile';
  protected override pageDescription: string = 'User Profile Page';

  public formGroup$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public isPerson: boolean = false;

  constructor(
    private personService: PersonService,
    private hotelService: HotelService,
    injector: Injector
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    this.handleUser();
  }

  public onSubmit(): void {
    Optional.ofNullable(this.formGroup$.value)
            .filter(form => form.valid)
            .map(form => form.value)
            .ifPresentOrElse(
              (user: Person | Hotel) => this.updateUser(user),
              () => this.snackbar.info('Please fill all required fields')
            );
  }

  private updateUser(user: Person | Hotel): void {
    this.isPerson
      ? this.updatePerson(user as Person)
      : this.updateHotel(user as Hotel);
  }

  private updatePerson(person: Person): void {
    this.personService.update(person)
      .subscribe({
        next: this.handleUpdateSuccess,
        error: this.handleError
      });
  }

  private updateHotel(hotel: Hotel): void {
    this.hotelService.update(hotel)
      .subscribe({
        next: this.handleUpdateSuccess,
        error: this.handleError
      });
  }

  private handleUpdateSuccess = (): void => {
    this.authenticationService.verifyAuthenticationContext();
    this.snackbar.success('Profile updated successfully');
  }

  private handleUser(): void {
    this.authenticationService.isCurrentUserPerson() 
      ? this.handlePerson() 
      : this.handleHotel();
  }

  private handlePerson(): void {
    this.isPerson = true;
    this.authenticationService.currentPerson()
      .subscribe(this.createPersonForm);
  }

  private handleHotel(): void {
    this.isPerson = false;
    this.authenticationService.currentHotel()
      .subscribe(this.createHotelForm);
  }

  private createPersonForm = (person: Person): void => {
    this.formGroup$.next(
      createPersonForm(person)
    );
  }

  private createHotelForm = (hotel: Hotel): void => {
    this.formGroup$.next(
      createHotelForm(hotel)
    );
  }

}
