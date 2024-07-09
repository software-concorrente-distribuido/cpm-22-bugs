import { Component } from '@angular/core';
import { EtherButtonTextIconComponent } from '../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { Router } from '@angular/router';

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
