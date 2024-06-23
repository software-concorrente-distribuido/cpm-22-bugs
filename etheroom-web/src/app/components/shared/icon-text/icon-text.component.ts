import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-text',
  standalone: true,
  imports: [],
  templateUrl: './icon-text.component.html',
  styleUrl: './icon-text.component.scss'
})
export class IconTextComponent {

  @Input()
  public text?: string;

}
