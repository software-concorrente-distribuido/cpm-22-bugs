import { Component } from '@angular/core';
import { EtherButtonComponent } from '../shared/ether-button/ether-button.component';
import { NavigationComponent } from '../shared/navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    EtherButtonComponent,
    NavigationComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isInvertColors: boolean = true;

  public navRoutes = [
    { path: '/', label: 'HOME' },
    { path: '/all-hotels', label: 'ALL HOTELS' },
    { path: '/explore-cities', label: 'EXPLORE CITIES' },
    { path: '/about-us', label: 'ABOUT US' },
    { path: '/faq', label: 'FAQ' }
  ];

  public handleButtonClick(): void {
    console.log('Button clicked!');
  }

}
