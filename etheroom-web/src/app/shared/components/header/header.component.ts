import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isInvertColors: boolean = true;
  public access: string = 'hotel';

  public navRoutes!: {
    path: string;
    label: string;
  }[];


  ngOnInit(): void {
    this.accessRoutes();
  }

  public accessRoutes(): void {
    switch (this.access) {
      case 'public':
        this.navRoutes = [
          { path: '/home', label: 'HOME' },
          { path: '/all-hotels', label: 'ALL HOTELS' },
          { path: '/explore-cities', label: 'EXPLORE CITIES' },
          { path: '/about-us', label: 'ABOUT US' },
          { path: '/faq', label: 'FAQ' }
        ];
        break;

      case 'guest':
        this.navRoutes = [
          { path: '/home', label: 'HOME' },
          { path: '/all-hotels', label: 'ALL HOTELS' },
          { path: '/my-bookings', label: 'MY BOOKINGS' },
          { path: '/profile', label: 'PROFILE' },
          { path: '/faq', label: 'FAQ' }
        ];
        break;

      case 'hotel':
        this.navRoutes = [
          { path: '/home', label: 'HOME' },
          { path: '/manage-rooms', label: 'MANAGE ROOMS' },
          { path: '/my-bookings', label: 'MY BOOKINGS' },
          { path: '/profile', label: 'PROFILE' }
        ];
    }
  }

  public handleButtonClick(): void {
    console.log('Button clicked!');
  }

}
