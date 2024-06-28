import { Component } from '@angular/core';
import { EtherIconTextComponent } from '../../ether-icon-text/ether-icon-text.component';
import { EtherIconButtonComponent } from '../../ether-icon-button/ether-icon-button.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    EtherIconTextComponent,
    EtherIconButtonComponent
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

  public handleButtonClick(): void {
    console.log('Button clicked');
  }
}
