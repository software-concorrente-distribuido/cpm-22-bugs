import { AfterContentInit, Component, ContentChildren, EmbeddedViewRef, Input, OnDestroy } from '@angular/core';
import { EtherButtonTextIconComponent } from '../ether-button-text-icon/ether-button-text-icon.component';
import { Router } from '@angular/router';
import { EtherRowDefDirective } from './directives/ether-row-def.directive';
import { EtherRowDefContext } from './models/ether-row-def-context.model';
import { EtherDataSource } from './models/ether-data-source.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { EtherTableHeaderComponent } from './ether-table-header/ether-table-header.component';

@Component({
  selector: 'ether-table',
  standalone: true,
  imports: [
    EtherButtonTextIconComponent
  ],
  templateUrl: './ether-table.component.html',
  styleUrl: './ether-table.component.scss'
})
export class EtherTableComponent<T> implements AfterContentInit, OnDestroy {

  @ContentChildren(EtherTableHeaderComponent)
  public headers!: EtherTableHeaderComponent[];

  public embeddedViewRefs: EmbeddedViewRef<EtherRowDefContext<T>>[] = [];
  public etherDataSource?: EtherDataSource<T>;
  public etherRowDef?: EtherRowDefDirective<T>;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public router: Router
  ) {}

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public handleClickButton() {
    this.router.navigate(['hotel/manage-rooms/room-details']);
  }

  @Input()
  public set dataSource(dataSource: EtherDataSource<T>) {
    this.setDataSource(dataSource);
  }

  public updateRows(): void {
    this.updateView();
  }

  private updateView(): void {
    this.embeddedViewRefs.forEach(view => view.destroy());

    this.etherDataSource?.data.forEach((data, index) => {
      const view = this.etherRowDef?.createEmbeddedView(data, index);
      this.embeddedViewRefs.push(view);
    });
  }

  private setDataSource(dataSource: EtherDataSource<T>) {
    if (dataSource instanceof EtherDataSource) {
      this.etherDataSource = dataSource;
    } else {
      this.etherDataSource = new EtherDataSource(dataSource);
    }
    if (this.etherDataSource) {
      this.subscriptions.push(
        this.etherDataSource.onChanges().subscribe(() => {
          this.updateView();
        })
      );
    }
  }
}
