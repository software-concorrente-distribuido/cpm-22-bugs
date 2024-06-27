import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-icon-text',
  standalone: true,
  imports: [],
  templateUrl: './ether-icon-text.component.html',
  styleUrl: './ether-icon-text.component.scss'
})
export class EtherIconTextComponent {

  @Input()
  public text?: string;

}
