import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { EtherNavigationComponent } from './components/shared/ether-navigation/ether-navigation.component';
import { routes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { EtherPageComponent } from './components/shared/containers/ether-page/ether-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    HeaderComponent,
    EtherPageComponent,
    EtherNavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'etheroom-web';
}
