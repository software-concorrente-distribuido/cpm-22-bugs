import { Component } from '@angular/core';
import { EtherIconTextComponent } from '../../ether-icon-text/ether-icon-text.component';
import { EtherGoButtonComponent } from '../../ether-go-button/ether-go-button.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    EtherIconTextComponent,
    EtherGoButtonComponent
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

  public handleButtonClick(): void {
    console.log('Button clicked');
  }
}
