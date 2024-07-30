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

  private readonly DEFAULT_TEXT: string = 'Are you sure?';

  @Input()
  public set text(confirmationText: string) {
    this.confirmationText$.next(confirmationText ?? this.DEFAULT_TEXT);
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
