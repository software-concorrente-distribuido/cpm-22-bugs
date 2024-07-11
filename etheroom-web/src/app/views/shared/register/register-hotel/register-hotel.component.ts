import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-hotel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss', '../../../../../styles/global.scss']
})
export class RegisterHotelComponent {

  amenity: string = '';
  amenities: string[] = [];
  attraction: string = '';
  attractions: string[] = [];

  public addAmenity() {
    console.log('Current Amenity:', this.amenity); // Adicionado para depuração
    if (this.amenity.trim() !== '') {
      this.amenities.push(this.amenity.trim());
      this.amenity = '';
      console.log('Amenities:', this.amenities); // Verificando se comodidades estão sendo adicionadas
    } else {
      console.log('Amenity is empty or only spaces'); // Adicionado para depuração
    }
  }

  public addAttraction() {
    console.log('Current Attraction:', this.attraction); // Adicionado para depuração
    if (this.attraction.trim() !== '') {
      this.attractions.push(this.attraction.trim());
      this.attraction = '';
      console.log('Attractions:', this.attractions); // Verificando se comodidades estão sendo adicionadas
    } else {
      console.log('Attraction is empty or only spaces'); // Adicionado para depuração
    }
  }

}
