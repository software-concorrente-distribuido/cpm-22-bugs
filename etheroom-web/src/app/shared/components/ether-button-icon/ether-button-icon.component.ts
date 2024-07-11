import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ether-button-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ether-button-icon.component.html',
  styleUrl: './ether-button-icon.component.scss'
})
export class EtherButtonIconComponent {

  @Input()
  public iconName!: string;

  @Input()
  public buttonType?: string = 'primary';
  
  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

  public setIconName(iconName: string): string {
    return `./../../../../assets/icons/${iconName}.svg`;
  }

}
