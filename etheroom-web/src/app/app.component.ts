import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './views/shared/home/home.component';
import { EtherPageComponent } from './shared/components/containers/ether-page/ether-page.component';
import { SharedModule } from './shared/shared.module';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ApplicationService } from './core/services/application.service';

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'etheroom-web';
  public showHeader: boolean = true;
  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    appService: ApplicationService
  ) { }
  
  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.shouldShowHeader(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
  
  private shouldShowHeader(url: string): boolean {
    const noHeaderRoutes = ['/sign-in', '/sign-up', '/sign-up-hotel'];
    return !noHeaderRoutes.includes(url);
  }
}
