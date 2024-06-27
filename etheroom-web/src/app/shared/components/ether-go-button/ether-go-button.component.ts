import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ether-go-button',
  standalone: true,
  imports: [],
  templateUrl: './ether-go-button.component.html',
  styleUrl: './ether-go-button.component.scss'
})
export class EtherGoButtonComponent {
  
  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

}
