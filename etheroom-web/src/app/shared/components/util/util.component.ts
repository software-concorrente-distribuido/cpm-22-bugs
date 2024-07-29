import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationError, Enum, EtheroomApplicationError } from '../../../core/types/types';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LoadingService } from '../splash-screen/loading.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { PlatformService } from '../../../core/services/platform.service';
import { Optional } from '../../../core/utils/optional';

@Injectable()
export abstract class UtilComponent {

  protected loading: LoadingService;
  // protected dialog: DialogsService;
  protected router: Router;
  protected snackbar: SnackbarService;
  protected authenticationService: AuthenticationService;
  protected platformService: PlatformService;

  constructor(injector: Injector) {
    this.loading = injector.get(LoadingService);
    // this.dialog = injector.get(DialogsService);
    this.router = injector.get(Router);
    this.snackbar = injector.get(SnackbarService);
    this.authenticationService = injector.get(AuthenticationService);
    this.platformService = injector.get(PlatformService);
  }

  protected abstract pageTitle: string;

  protected abstract pageDescription: string;

  protected onInit = (): void => {
    this.setTitleAndDescription(this.pageTitle, this.pageDescription);
  }

  protected getEnumDescriptionByName = (enumName: string, enums: Enum[]): string => {
    return Optional.ofNullable(enums.find((enumItem: Enum) => enumItem.name === enumName))
                    .map((enumItem: Enum) => enumItem.description)
                    .orElse('Não informado');
  }

  protected castAbstractToFormControl = (abstract: AbstractControl): FormControl => {
    return abstract as FormControl;
  }

  protected castAbstractToFormGroup = (abstract: AbstractControl): FormGroup => {
    return abstract as FormGroup;
  }

  protected handleError = (httpError: ApplicationError): void => {
    const errorPayload: EtheroomApplicationError | any = httpError.error;
    this.loading.stop();
    if (errorPayload?.status === 403) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
      return;
    }
    this.snackbar.error(
      this.isEtheroomApplicationError(errorPayload)
        ? (errorPayload as EtheroomApplicationError)?.details
        : (errorPayload as any)?.message
    );
  }

  private isEtheroomApplicationError(error: any | EtheroomApplicationError): boolean {
    return 'developerMessage' in error;
  }

  private setTitleAndDescription = (title: string, description: string): void => {
    this.platformService.setTitleAndDescription(title, description);
  }

}
