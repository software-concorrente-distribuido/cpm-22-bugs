import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ether-button',
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

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

}
