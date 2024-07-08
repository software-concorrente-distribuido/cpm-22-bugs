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

  constructor(
    public host: Renderer2,
    public elementRef: ElementRef
  ) { }

  @Input()
  public setColumnName(columnName: string) {
    this.host.addClass(
      this.elementRef.nativeElement, 'ether-header-cell--' + columnName
    );
  }

}
