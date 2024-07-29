import { Component, Input, OnInit } from '@angular/core';
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
export class EtherNavigationComponent implements OnInit {

  @Input()
  public routes: NavRoute[] = [];

  public isHotel: boolean;
  public isUser: boolean;
  public homeAccess: boolean;
  
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isUser = this.authenticationService.isCurrentUserPerson();
    this.isHotel = this.authenticationService.isCurrentUserHotel();
    console.log("É cliente? " + this.isUser + " (Ether navigation)");
    console.log("É hotel? " + this.isHotel + " (Ether navigation)");
    this.homeAccess = this.isHotel || this.isUser || true;
  }

  // public get isHotel(): boolean {
  //   return this.authenticationService.isCurrentUserHotel();
  // }

  // public get isUser(): boolean {
  //   return this.authenticationService.isCurrentUserPerson();
  // }

  // public get homeAccess(): boolean {
  //   return this.isHotel || this.isUser || true;
  // }
}

