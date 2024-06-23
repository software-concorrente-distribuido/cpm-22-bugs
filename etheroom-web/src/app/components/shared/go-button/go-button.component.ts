import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-go-button',
  standalone: true,
  imports: [],
  templateUrl: './go-button.component.html',
  styleUrl: './go-button.component.scss'
})
export class GoButtonComponent {
  
  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.onClick.emit();
  }

}
