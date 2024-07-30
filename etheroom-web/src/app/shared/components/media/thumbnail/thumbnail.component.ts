import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MediaService } from '../../../../core/services/media.service';
import { Optional } from '../../../../core/utils/optional';
import { Media } from '../../../../core/models/media/media.model';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'ether-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss',
  host: {
    class: 'ether-thumbnail'
  }
})
export class ThumbnailComponent {

  private readonly DEFAULT_FILE_URL: string = './../../../../../assets/images/example-hotel.svg';
  
  private readonly BASE_64_PREFIX: string = 'data:image/png;base64,';

  public control$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  public viewOnly: boolean = false;

  @Input()
  public set thumbnailControl(value: Media | FormControl) {
    this.control$.next(
      value instanceof Media
        ? new FormControl(value)
        : value
    )
  }

  @Input()
  public set isViewOnly(value: boolean) {
    this.viewOnly = value;
  }

  constructor(
    private mediaService: MediaService,
    private snackbarService: SnackbarService
  ) {

  }

  public onFileChange(event: Event): void {
    Optional.ofNullable(event)
      .map((event) => event.target)
      .map((target) => target as HTMLInputElement)
      .map((target) => target.files)
      .filter((files) => files?.length > 0)
      .map((files) => files[0])
      .ifPresent(this.handleMediaUpload);
  }

  public get fileUrl(): string {
    return Optional.ofNullable(this.mediaControl.value)
                    .map((media) => media as Media)
                    .map((media) => media.data)
                    .map((data: string) => this.BASE_64_PREFIX + data)
                    .orElse(this.DEFAULT_FILE_URL);
  }

  public get filename(): string {
    return Optional.ofNullable(this.mediaControl.value)
                    .map((media) => media as Media)
                    .map((media) => media.filename)
                    .orElse('thumbnail');
  }

  public get temporaryMedia(): boolean {
    return Optional.ofNullable(this.mediaControl.value)
                    .map((media) => media as Media)
                    .map((media) => media.id)
                    .isEmpty();
  }

  private get mediaControl(): FormControl {
    return this.control$.value;
  }

  private handleMediaUpload = (file: File): void => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    Optional.ofNullable(this.mediaControl.value)
      .map((media) => media as Media)
      .map((media) => media.id)
      .ifPresentOrElse(
        (mediaId) => this.updateMedia(mediaId, formData),
        () => this.createMedia(formData)
      );
  }

  private createMedia(formData: FormData): void {
    this.mediaService.create(formData)
      .subscribe({
        next: (media: Media) => {
          this.mediaControl.setValue(media);
          this.snackbarService.success('File saved successfully')
        },
        error: (error: any) => this.snackbarService.error(error?.error?.details)
      });
  }

  private updateMedia(mediaId: string, formData: FormData): void {
    this.mediaService.update(mediaId, formData)
      .subscribe({
        next: (media: Media) => {
          this.mediaControl.setValue(media);
          this.snackbarService.success('File updated successfully')
        },
        error: (error: any) => this.snackbarService.error(error?.error?.details)
      });
  }

}
