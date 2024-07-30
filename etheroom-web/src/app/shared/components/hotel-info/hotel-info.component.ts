import { Component, Input } from '@angular/core';
import { Hotel } from '../../../core/models/hotel/hotel.model';
import { Optional } from '../../../core/utils/optional';

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

}
