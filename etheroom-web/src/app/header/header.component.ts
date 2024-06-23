import { Component } from '@angular/core';
import { EtherButtonComponent } from '../components/shared/ether-button/ether-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [EtherButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isInvertColors: boolean = true;

}
