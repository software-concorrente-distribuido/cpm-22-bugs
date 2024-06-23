import { Component } from '@angular/core';
import { IconTextComponent } from '../../icon-text/icon-text.component';
import { GoButtonComponent } from '../../go-button/go-button.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    IconTextComponent,
    GoButtonComponent
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

  public handleButtonClick(): void {
    console.log('Button clicked');
  }
}
