import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './views/shared/home/home.component';
import { EtherPageComponent } from './shared/components/containers/ether-page/ether-page.component';
import { SharedModule } from './shared/shared.module';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    EtherPageComponent,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'etheroom-web';
  public showHeader: boolean = true;

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showHeader = (event instanceof NavigationStart) ? false : true;
    });
  }
}
