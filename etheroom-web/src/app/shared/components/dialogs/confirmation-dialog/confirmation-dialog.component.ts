import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogsService } from '../dialogs.service';

@Component({
  selector: 'ether-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {

  @Input()
  public set text(confirmationText: string) {
    this.confirmationText$.next(confirmationText);
  }

  public confirmationText$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private dialogService: DialogsService
  ) {
  }

  public onClickOption(bool: boolean): void {
    this.dialogService.close(bool);
  }

}
