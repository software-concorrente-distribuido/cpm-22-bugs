import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isInvertColors: boolean = true;

  public navRoutes = [
    { path: '/home', label: 'HOME' },
    { path: '/all-hotels', label: 'ALL HOTELS' },
    { path: '/explore-cities', label: 'EXPLORE CITIES' },
    { path: '/about-us', label: 'ABOUT US' },
    { path: '/faq', label: 'FAQ' }
  ];

  public handleButtonClick(): void {
    console.log('Button clicked!');
  }

}
