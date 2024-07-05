import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ether-button-text-icon',
  standalone: true,
  imports: [],
  templateUrl: './ether-button-text-icon.component.html',
  styleUrl: './ether-button-text-icon.component.scss'
})
export class EtherButtonTextIconComponent {

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
