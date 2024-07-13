import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DialogsService } from './dialogs.service';
import { BehaviorSubject } from 'rxjs';
import { DialogComponentData } from './dialog.types';

@Component({
  selector: 'etheroom-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnDestroy {

  public open$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public dialogComponentData$: BehaviorSubject<DialogComponentData> = new BehaviorSubject(null);

  constructor(
    private dialogsService: DialogsService
  ) {
    this.open$ = this.dialogsService.open$;
    this.dialogComponentData$ = this.dialogsService.dialogComponentData$;
  }

  ngOnDestroy(): void {
    this.open$.unsubscribe();
    this.dialogComponentData$.unsubscribe();
  }

  public onClickDialogWrapper(): void {
    this.dialogsService.close();
  }

}
