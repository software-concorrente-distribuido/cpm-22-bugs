import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInfoComponent } from '../../shared/components/hotel-info/hotel-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EtherInputFieldComponent } from '../../shared/components/ether-input-field/ether-input-field.component';
import { EtherPageComponent } from '../../shared/components/containers/ether-page/ether-page.component';

export enum HotelsTypes {
  FULL_SERVICE = 'FULL-SERVICE',
  BOUTIQUE = 'BOUTIQUE',
  LUXURY = 'LUXURY',
  RESORT = 'RESORT',
  BUSINESS = 'BUSINESS',
  ECO_FRIENDLY = 'ECO-FRIENDLY',
}

@Component({
  selector: 'ether-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    HotelInfoComponent,
    EtherPageComponent,
    EtherInputFieldComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public hotelsTypes = Object.values(HotelsTypes);
}
