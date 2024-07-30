import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'etheroom-splash-screen',
  template: `
    <div 
      *ngIf="isLoading$ | async as isLoading" 
      [class]="'splash-screen ' + (isLoading ? 'show' : 'hide')"
    >
      <img src="./../../../../assets/images/etheroom-logo.svg" alt="Processando informações"/>
    </div>
  `,
  styleUrls: ['./splash-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent implements OnDestroy {

  public isLoading$: BehaviorSubject<boolean>;

  constructor(
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnDestroy(): void {
      this.isLoading$.unsubscribe();
  }

}
