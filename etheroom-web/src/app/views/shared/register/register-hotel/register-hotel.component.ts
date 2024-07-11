import { Component } from '@angular/core';

@Component({
  selector: 'app-register-hotel',
  standalone: true,
  imports: [],
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss', '../../../../../styles/global.scss']
})
export class RegisterHotelComponent {

  amenity: string = '';
  amenities: string[] = [];

  addAmenity() {
    if (this.amenity.trim() !== '') {
      this.amenities.push(this.amenity.trim());
      this.amenity = '';
      console.log('Amenities:', this.amenities); //Verificando se comodidades estão sendo adicionadas
    }
  }

}
