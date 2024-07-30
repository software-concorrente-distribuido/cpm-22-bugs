import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HotelService } from './hotel.service';
import { PersonService } from './person.service';
import { environment } from '../../../environments/environments';
import { Optional } from '../utils/optional';
import { Hotel } from '../models/hotel/hotel.model';
import { Person } from '../models/person/person.model';
import { jwtDecode } from 'jwt-decode';
import { 
  AuthenticationRequest,
  AuthenticationResponse,
  EthereumAccount,
  JwtTokenClaims 
} from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private hotel$: BehaviorSubject<Hotel> = new BehaviorSubject<Hotel>(null);

  private person$: BehaviorSubject<Person> = new BehaviorSubject<Person>(null);

  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private userId: string;
  private role: string;
  private accessToken: string;

  private authApiUrl: string;

  private readonly AUTH_API_PATH: string = 'oauth';
  private readonly TOKEN_KEY: string = 'accessToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    private hotelService: HotelService,
    private personService: PersonService
  ) {
    this.authApiUrl = `${environment.apiUrl}/${this.AUTH_API_PATH}`;
    this.verifyAuthenticationContext();
  }

  public login(loginForm: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.authApiUrl}/login`, loginForm)
      .pipe(
        tap(this.onAuthenticationSuccess)
      );
  }

  public validateCredentials(loginForm: AuthenticationRequest): Observable<void> {
    return this.http.post<void>(`${this.authApiUrl}/validate`, loginForm);
  }

  public logout = (): void => {
    this.clearAuthenticationContext();
    this.router.navigate(['/home']);
  }

  public verifyAuthenticationContext(): void {
    Optional.ofNullable(this.accessToken)
            .or(Optional.ofNullable(localStorage.getItem(this.TOKEN_KEY)))
            .ifPresentOrElse(
              this.handleAccessToken,
              this.logout
            );
  }

  public verifyAuthentication(): boolean {
    this.verifyAuthenticationContext();
    return Optional.ofNullable(this.accessToken)
                    .isPresent();
  }

  public clearAuthenticationContext = (): void => {
    localStorage.removeItem(this.TOKEN_KEY);
    this.accessToken = null;
    this.userId = null;
    this.role = null;
    this.user$.next(null);
    this.hotel$.next(null);
    this.person$.next(null);
  }

  public currentUser = (): Observable<User> => this.user$.asObservable();

  public currentHotel = (): Observable<Hotel> => this.hotel$.asObservable();

  public currentPerson = (): Observable<Person> => this.person$.asObservable();

  public isCurrentUserHotel = (): boolean => this.role === 'HOTEL';

  public isCurrentUserPerson = (): boolean => this.role === 'PERSON' || this.role === 'USER';

  public buildAuthRequest(ethereumAccount: EthereumAccount): AuthenticationRequest {
    const authRequest: AuthenticationRequest = {
      ethereumAddress: ethereumAccount.account,
      ethereumPublicKey: ethereumAccount.secret
    };
    
    return authRequest;
  }

  private onAuthenticationSuccess = (response: AuthenticationResponse): void => {
    Optional.ofNullable(response.accessToken)
      .ifPresent(this.handleAccessToken);
  }

  private handleAccessToken = (token: string): void => {
    localStorage.setItem(this.TOKEN_KEY, token);
    const claims: JwtTokenClaims = jwtDecode(token);
    this.accessToken = token;
    this.userId = claims?.id;
    this.role = claims?.role;
    this.handleUserLoading();
  }

  private handleUserLoading = (): void => {
    this.role === 'HOTEL' ? this.loadHotel() : this.loadPerson();
  }

  private loadHotel = (): void => {
    this.hotelService.findByUserId(this.userId)
      .subscribe(this.handleHotel);
  }

  private loadPerson = (): void => {
    this.personService.findByUserId(this.userId)
      .subscribe(this.handlePerson);
  }

  private handleHotel = (hotel: Hotel): void => {
    this.hotel$.next(hotel);
    this.onUserLoaded(hotel.user);
  }

  private handlePerson = (person: Person): void => {
    this.person$.next(person);
    this.onUserLoaded(person.user);
  }

  private onUserLoaded = (user: User): void => {
    this.user$.next(user);
  }
  
}
