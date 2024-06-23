import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { HotelInfoComponent } from '../../components/shared/hotel-info/hotel-info.component';
import {MatTabsModule} from '@angular/material/tabs';

export enum HotelsTypes {
  FULL_SERVICE = 'FULL-SERVICE',
  BOUTIQUE = 'BOUTIQUE',
  LUXURY = 'LUXURY',
  RESORT = 'RESORT',
  BUSINESS = 'BUSINESS',
  ECO_FRIENDLY = 'ECO-FRIENDLY',
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    HotelInfoComponent,
    MatTabsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public hotelsTypes = Object.values(HotelsTypes);
}
