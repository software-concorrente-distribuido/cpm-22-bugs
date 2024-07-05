import { Component } from '@angular/core';
import { EtherButtonTextIconComponent } from '../ether-button-text-icon/ether-button-text-icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ether-table',
  standalone: true,
  imports: [
    EtherButtonTextIconComponent
  ],
  templateUrl: './ether-table.component.html',
  styleUrl: './ether-table.component.scss'
})
export class EtherTableComponent {

  constructor(
    public router: Router
  ) {}

  public handleClickButton() {
    this.router.navigate(['/manage-rooms/room-details']);
  }
}
