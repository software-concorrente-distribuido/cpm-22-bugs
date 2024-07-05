import { Component } from '@angular/core';
import { EtherFormFieldComponent } from '../inputs/ether-form-field/ether-form-field.component';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'ether-filter',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

}
