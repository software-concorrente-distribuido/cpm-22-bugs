import { Component, Input } from '@angular/core';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { Optional } from '../../../core/utils/optional';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ether-hotel-info',
  standalone: true,
  imports: [],
  templateUrl: './hotel-info.component.html',
  styleUrl: './hotel-info.component.scss'
})
export class HotelInfoComponent {

  private readonly DEFAULT_FILE_URL: string = './../../../../assets/images/example-hotel.svg';

  private readonly BASE_64_PREFIX: string = 'data:image/png;base64,';

  public hotelName: string;
  public hotelAddress: string;
  public hotelThumbnail: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  @Input()
  public set hotel(hotel: Hotel) {
    this.hotelThumbnail = Optional.ofNullable(this.hotel)
                                  .map(h => h.thumbnail)
                                  .map((media) => media.data)
                                  .map((data: string) => this.BASE_64_PREFIX + data)
                                  .orElse(this.DEFAULT_FILE_URL);
    this.hotelName = Optional.ofNullable(hotel)
                              .map(h => h.name)
                              .orElse(null);
    this.hotelAddress = Optional.ofNullable(hotel)
                                .map(h => h.address)
                                .map(a => a.description)
                                .orElse(null);
  }

  public onSearch(): void {
    let route: string = '/sign-in';
    if (this.authenticationService.isAuthenticationContextValid()) {
      route = this.authenticationService.isCurrentUserPerson() ? '/guest/all-hotels' : '/hotel/profile';
    }
    this.router.navigate([route]);
  }

}
