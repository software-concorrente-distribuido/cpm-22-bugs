import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { EtherRowDefContext } from '../models/ether-row-def-context.model';

@Directive({
  selector: '[appEtherRowDef]',
  standalone: true
})
export class EtherRowDefDirective<T> {

  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef
  ) { }

  public createEmbeddedView(data: T, index: number): EmbeddedViewRef<EtherRowDefContext<T>> {
    const context = new EtherRowDefContext(data, index);
    const embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      context,
      index
    );
    return embeddedViewRef;
  }

}
