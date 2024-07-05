import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'ether-header-cell',
  standalone: true,
  imports: [],
  template: `
    <div class='ether-header-cell'>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './ether-header-cell.component.scss'
})
export class EtherHeaderCellComponent {

  constructor(public elementRef: ElementRef) { }

  @Input()
  public setColumnName(columnName: string) {
    this.elementRef.nativeElement.setAttribute('data-column-name--', columnName);
  }

}
