import { Component } from '@angular/core';
import { EtherPageComponent } from '../../../shared/components/containers/ether-page/ether-page.component';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { EtherButtonIconComponent } from '../../../shared/components/ether-button-icon/ether-button-icon.component';
import { EtherTableComponent } from '../../../shared/components/ether-table/ether-table.component';
import { ManageRoomModule } from './manage-room.module';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ether-manage-rooms',
  standalone: true,
  imports: [
    RouterOutlet,
    EtherFilterComponent,
    ManageRoomModule,
    EtherPageComponent,
    EtherTableComponent,
    EtherButtonIconComponent
  ],
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.scss'
})
export class ManageRoomsComponent {

  constructor(
    public router: Router
  ) { }

  public handleButtonClick(): void {
    this.router.navigate(['hotel/manage-rooms/add-room']);
  }
}
