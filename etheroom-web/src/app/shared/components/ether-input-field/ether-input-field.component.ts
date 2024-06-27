import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-input-field',
  standalone: true,
  imports: [],
  templateUrl: './ether-input-field.component.html',
  styleUrl: './ether-input-field.component.scss'
})
export class EtherInputFieldComponent {

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

}
