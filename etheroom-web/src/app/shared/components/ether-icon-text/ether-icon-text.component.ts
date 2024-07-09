import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-icon-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <img [src]="setIconName(iconName)" [ngClass]="getIconSize()">
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

  @Input()
  public iconSize: 'n1' | 'n2' | 'n3' | 'default' = 'default';

  public getIconSize(): string {
    return `${this.iconSize}`;
  }

  public setIconName(iconName: string): string {
    return `./../../../../assets/icons/${iconName}.svg`;
  }

}
