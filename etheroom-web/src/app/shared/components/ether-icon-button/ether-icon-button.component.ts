import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ether-icon-button',
  standalone: true,
  imports: [],
  template: `
    <button (click)="handleClick()">
      <img [src]="setIconName(iconName)">
    </button>
  `,
  styleUrl: './ether-icon-button.component.scss'
})
export class EtherIconButtonComponent {

  @Input()
  public iconName!: string;
  
  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

  public setIconName(iconName: string): string {
    return `./../../../../assets/icons/${iconName}.svg`;
  }

}
