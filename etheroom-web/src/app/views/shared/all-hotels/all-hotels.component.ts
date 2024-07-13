import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ether-all-hotels',
  standalone: true,
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.scss', '../../../../styles/global.scss']
})
export class AllHotelsComponent {

  constructor (public router: Router) {

  }

  public seeAvailabilityButton(): void {
  this.router.navigate(['/room-page']);
  }
}
