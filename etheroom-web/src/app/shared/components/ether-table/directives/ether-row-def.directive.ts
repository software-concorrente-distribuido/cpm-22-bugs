import { Directive, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appEtherRowDef]',
  standalone: true
})
export class EtherRowDefDirective {

  constructor(
    public templateRef: Renderer2,
    public viewContainerRef: ViewContainerRef
  ) { }

  // public createEmbeddedView() {
  //   const context = this.;
  //   const index = this.viewContainerRef.length;
  //   this.viewContainerRef.createEmbeddedView(
  //     this.templateRef,
  //     context,
  //     index
  //   );
  // }

}
