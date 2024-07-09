import { Component } from '@angular/core';
import { EtherIconTextComponent } from '../../ether-icon-text/ether-icon-text.component';
import { EtherButtonIconComponent } from '../../ether-button-icon/ether-button-icon.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    EtherIconTextComponent,
    EtherButtonIconComponent
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

  public handleButtonClick(): void {
    console.log('Button clicked');
  }
}
