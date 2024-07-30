import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInfoComponent } from '../../../shared/components/hotel-info/hotel-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EtherPageComponent } from '../../../shared/components/containers/ether-page/ether-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { EtherHomeSectionTitleComponent } from '../../../shared/components/ether-home-section-title/ether-home-section-title.component';
import { HotelService } from '../../../core/services/hotel.service';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { Page } from '../../../core/types/types';
import { Optional } from '../../../core/utils/optional';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ether-home',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    MatTabsModule,
    HotelInfoComponent,
    EtherPageComponent,
    EtherHomeSectionTitleComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public mostBookedHotels$: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);

  public aboutUsHotel$: BehaviorSubject<Hotel> = new BehaviorSubject<Hotel>(null);

  constructor(
    private hotelService: HotelService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.findMostBookedHotels();
  }

  public onSearch(): void {
    let route: string = '/sign-in';
    if (this.authenticationService.isAuthenticationContextValid()) {
      route = this.authenticationService.isCurrentUserPerson() ? '/guest/all-hotels' : '/hotel/profile';
    }
    this.router.navigate([route]);
  }

  private findMostBookedHotels(): void {
    this.hotelService.findMostBooked(0, 5).subscribe(this.handleMostBookedHotels);
  }

  private handleMostBookedHotels = (hotels: Page<Hotel>): void => {
    Optional.ofNullable(hotels)
            .map((page: Page<Hotel>) => page.content)
            .filter((hotels: Hotel[]) => hotels.length > 0)
            .tap((hotels: Hotel[]) => this.mostBookedHotels$.next(hotels.slice(0, 4)))
            .map((hotels: Hotel[]) => hotels.reverse())
            .map((hotels: Hotel[]) => hotels[0])
            .ifPresent(hotel => this.aboutUsHotel$.next(hotel));
  }
  
}
