import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-icon-text',
  standalone: true,
  imports: [],
  template: `
    <div>
      <img [src]="setIconName(iconName)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './ether-icon-text.component.scss'
})
export class EtherIconTextComponent {

  @Input()
  public text?: string;

  @Input()
  public iconName!: string;

  public setIconName(iconName: string): string {
    return `./../../../../assets/icons/${iconName}.svg`;
  }

}
