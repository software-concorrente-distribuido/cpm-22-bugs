import { Component } from '@angular/core';
import { EtherFormFieldComponent } from '../inputs/ether-form-field/ether-form-field.component';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'ether-filter',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './ether-filter.component.html',
  styleUrl: './ether-filter.component.scss'
})
export class EtherFilterComponent {

}
