import { Component } from '@angular/core';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ether-my-bookings',
  standalone: true,
  imports: [
    EtherFilterComponent,
    RouterOutlet
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

}
