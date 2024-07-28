import { Component } from '@angular/core';
import { EtherIconTextComponent } from '../../ether-icon-text/ether-icon-text.component';
import { ButtonsModule } from '../../buttons/buttons.module';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    EtherIconTextComponent,
    ButtonsModule
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

  public handleButtonClick(): void {
    console.log('Button clicked');
  }
}
