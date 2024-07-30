import { PersonService } from './../../../core/services/person.service';
import { Component, Injector, OnInit } from '@angular/core';
import { UtilComponent } from '../../../shared/components/util/util.component';
import { Web3Service } from '../../../core/services/web3.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { createHotelForm, createPersonForm } from '../../../core/utils/forms';
import { AuthenticationResponse, EthereumAccount } from '../../../core/types/types';
import { HotelService } from '../../../core/services/hotel.service';
import { Person } from '../../../core/models/person/person.model';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../../shared/shared.module";
import { AboutComponent } from "../about/about.component";
import { User } from '../../../core/models/user/user.model';
import { UserRole } from '../../../core/data/enums';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterModule, AboutComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends UtilComponent implements OnInit {

  public userForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public ethereumAccount$: BehaviorSubject<EthereumAccount> = new BehaviorSubject<EthereumAccount>(null);

  public isPerson: boolean = false;

  public connectionAttempted: boolean = false;

  protected override pageTitle: string = "New Account";
  protected override pageDescription: string = "Create a new account to access our services";
  
  constructor(
    private web3Service: Web3Service,
    private personService: PersonService,
    private hotelService: HotelService,
    injector: Injector
  ) {
    super(injector);
    this.onInit();
  }

  public async ngOnInit(): Promise<void> {
      await this.web3Service.initializeWeb3();
      this.loadEthereumAccount();
  }

  public onClickPerson(): void {
    this.createPersonForm();
  }

  public onClickHotel(): void {
    this.createHotelForm();
  }

  public reset(): void {
    this.userForm$.next(null);
  }

  public onSubmit(): void {
    const form: FormGroup = this.userForm$.value;
    if(form.valid) {
      this.loading.start();
      const formValues = this.getFormValues(form);
      this.isPerson ? this.createPerson(formValues) : this.createHotel(formValues);
    }
    else {
      this.snackbar.info("Please fill all the required fields");
    }
  }

  public retryConnection(): void {
    this.loadEthereumAccount();
  }

  private loadEthereumAccount(): void {
    this.web3Service.buildEthereumAccount().then(
      account => this.ethereumAccount$.next(account)
    ).catch(() => this.connectionAttempted = true);
  }

  private createPerson(person: Person): void {
    this.personService.create(person)
      .subscribe({
        next: (person: Person) => {
          this.loading.stop();
          this.snackbar.success("Person created successfully");
          this.handleLogin();
          // this.router.navigate([`/profile`], { queryParams: { id: person.user.id } });
        },
        error: this.handleError
      });
  }

  private createHotel(hotel: Hotel): void {
    this.hotelService.create(hotel)
      .subscribe({
        next: (hotel: Hotel) => {
          this.loading.stop();
          this.snackbar.success("Hotel created successfully");
          // this.router.navigate([`/profile`], { queryParams: { id: hotel.user.id } });
          this.handleLogin();
        },
        error: this.handleError
      });
  }

  private createPersonForm(): void {
    this.isPerson = true;
    const user: User = User.fromEthereumAccount(this.ethereumAccount$.value);
    user.role = UserRole.USER;
    this.userForm$.next(createPersonForm(Person.fromUser(user)));
  }

  private createHotelForm(): void {
    this.isPerson = false;
    const user: User = User.fromEthereumAccount(this.ethereumAccount$.value);
    user.role = UserRole.HOTEL;
    this.userForm$.next(createHotelForm(Hotel.fromUser(user)));
  }

  private getFormValues(form: FormGroup): any {
    form.enable();
    const values = form.getRawValue();
    form.disable();
    return values;
  }

  private handleLogin(): void {
    this.authenticationService.login(this.authenticationService.buildAuthRequest(this.ethereumAccount$.value)).subscribe({
      next: () => this.snackbar.success("Login successful"),
      error: (error) => this.handleError(error)
    });
  }

  private handleAuthResponse(response: AuthenticationResponse): void {
    if (response && response.accessToken) {
      this.router.navigate(['/home']); // Navega para a página inicial
    } else {
      this.router.navigate(['/register']); // Navega para a página de registro
    }
  }

}