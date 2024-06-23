import { Component, Input } from '@angular/core';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

@Component({
  selector: 'app-hotel-info',
  standalone: true,
  imports: [HotelDetailsComponent],
  templateUrl: './hotel-info.component.html',
  styleUrl: './hotel-info.component.scss'
})
export class HotelInfoComponent {

  @Input()
  public srcImage?: string;

}
