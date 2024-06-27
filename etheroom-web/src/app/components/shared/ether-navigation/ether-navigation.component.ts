import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavRoute {
  path: string;
  label: string;
}

@Component({
  selector: 'ether-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './ether-navigation.component.html',
  styleUrl: './ether-navigation.component.scss'
})
export class EtherNavigationComponent {

  @Input()
  public routes: NavRoute[] = [];

}
