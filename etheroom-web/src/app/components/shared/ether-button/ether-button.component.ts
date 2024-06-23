import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ether-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ether-button.component.html',
  styleUrl: './ether-button.component.scss'
})
export class EtherButtonComponent {

  @Input()
  public buttonText?: string;

  @Input()
  public buttonType?: string;

  @Input()
  public isInvertColors?: boolean;

}
