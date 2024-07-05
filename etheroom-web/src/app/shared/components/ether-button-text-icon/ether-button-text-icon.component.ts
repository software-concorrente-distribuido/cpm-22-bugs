import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ether-button-text-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ether-button-text-icon.component.html',
  styleUrl: './ether-button-text-icon.component.scss'
})
export class EtherButtonTextIconComponent {

  @Input()
  public buttonType: string = 'primary';

  @Input()
  public iconName!: string;

  @Input()
  // public iconSizes: [] = ['n1', 'n2', 'n3'];

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

  public setIconName(iconName: string): string {
    return `./../../../../assets/icons/${iconName}.svg`;
  }

}
