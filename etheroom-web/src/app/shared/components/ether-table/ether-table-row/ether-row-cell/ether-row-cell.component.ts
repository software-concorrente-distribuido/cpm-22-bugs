import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'ether-row-cell',
  standalone: true,
  imports: [],
  template: `
    <div class='ether-row-cell'>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './ether-row-cell.component.scss',
  host: {
    class: 'ether-row-cell'
  }
})
export class EtherRowCellComponent {

  constructor(
    public host: Renderer2,
    public elementRef: ElementRef
  ) { }

  @Input()
  public setColumnName(columnName: string) {
    this.host.addClass(
      this.elementRef.nativeElement, 'ether-row-cell--' + columnName
    );
  }

}
