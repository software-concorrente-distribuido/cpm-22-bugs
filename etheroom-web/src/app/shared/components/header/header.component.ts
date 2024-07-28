import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) { }

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
          { path: '/guest/your-bookings', label: 'MY BOOKINGS' },
          { path: '/guest/profile', label: 'PROFILE' },
          { path: '/faq', label: 'FAQ' }
        ];
        break;

      case 'hotel':
        this.navRoutes = [
          { path: '/home', label: 'HOME' },
          { path: '/hotel/manage-rooms', label: 'MANAGE ROOMS' },
          { path: '/hotel/my-bookings', label: 'MY BOOKINGS' },
          { path: '/hotel/profile', label: 'PROFILE' }
        ];
    }
  }

  public handleButtonSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  public handleButtonSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

}
