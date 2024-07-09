import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtherButtonTextIconComponent } from '../../../shared/components/ether-button-text-icon/ether-button-text-icon.component';

@Component({
  selector: 'ether-login',
  standalone: true,
  imports: [EtherButtonTextIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'ether-login'
  }
})
export class LoginComponent {

  constructor(public router: Router) { }

  public handleButtonClick(): void {
    this.router.navigate(['/home']);
  }

  public pathToImage(imageName: string, extension: string): string {
    return `./../../../assets/images/${imageName}.${extension}`;
  }
}
