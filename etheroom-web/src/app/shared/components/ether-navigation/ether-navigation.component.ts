import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

interface NavRoute {
  path: string;
  label: string;
}

@Component({
  selector: 'ether-navigation',
  templateUrl: './ether-navigation.component.html',
  styleUrl: './ether-navigation.component.scss'
})
export class EtherNavigationComponent {

  @Input()
  public routes: NavRoute[] = [];
  
  constructor(private authenticationService: AuthenticationService) { }

  public get isHotel(): boolean {
    return this.authenticationService.isCurrentUserHotel();
  }

  public get isUser(): boolean {
    return this.authenticationService.isCurrentUserPerson();
  }

  public get homeAccess(): boolean {
    return this.isHotel || this.isUser || true;
  }
}
