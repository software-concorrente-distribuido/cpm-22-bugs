import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../../styles/global.scss']
})
export class RegisterComponent {

  constructor(public router: Router) {
  }

public createHotel() {
this.router.navigate(['/sign-up-hotel']);
}
  
}
