import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MediaService } from '../../../../core/services/media.service';
import { Media } from '../../../../core/models/media/media.model';
import { Optional } from '../../../../core/utils/optional';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ether-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
  
  private readonly DEFAULT_FILE_URL: string = './../../../../../assets/images/example-hotel.svg';
  
  private readonly BASE_64_PREFIX: string = 'data:image/png;base64,';

  public control$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  public currentImage$: BehaviorSubject<Media> = new BehaviorSubject<Media>(null);

  public otherImages$: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>(null);

  public canEdit: boolean = true;

  public hasImage: boolean = false;

  public hasManyImages: boolean = false;

  private initialImages: Media[] = [];

  @Input()
  public set imagesControl(value: Media[] | FormControl) {
    this.handleImagesInput(value);
  }

  @Input()
  public set isViewOnly(value: boolean) {
    this.canEdit = !value;
  }

  constructor(
    private mediaService: MediaService,
    private snackbarService: SnackbarService,
    private dialogService: DialogsService
  ) {  }

  public buildFileUrlFromMedia(media: Media): string {
    return Optional.ofNullable(media)
                    .map((media) => media.data)
                    .map((data: string) => this.BASE_64_PREFIX + data)
                    .orElse(this.DEFAULT_FILE_URL);
  }

  public onFileChange(event: Event, update: boolean = false): void {
    Optional.ofNullable(event)
      .map((event) => event.target)
      .map((target) => target as HTMLInputElement)
      .map((target) => target.files)
      .filter((files) => files?.length > 0)
      .map((files) => files[0])
      .ifPresent((file) => this.handleMediaUpload(file, update));
  }

  public onImageSelected(image: Media): void {
    this.otherImages$.next(
      this.initialImages.filter((img) => img.id !== image.id)
    );
    this.currentImage$.next(image);
  }

  public onClickDelete(): void {
    Optional.ofNullable(this.currentImage$.value)
            .map((media) => media.id)
            .ifPresent((mediaId) => {
              this.dialogService.open(ConfirmationDialogComponent,
                {
                  inputs: {
                    text: 'Are you sure you want to delete this file?'
                  },
                  onClose: (result) => result && this.deleteMedia(mediaId)
                }
              )
            });
  }

  private handleMediaUpload = (file: File, update: boolean = false): void => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    Optional.ofNullable(this.currentImage$.value)
      .map((media) => media.id)
      .filter(() => update)
      .ifPresentOrElse(
        (mediaId) => this.updateMedia(mediaId, formData),
        () => this.createMedia(formData)
      );
  }

  private createMedia(formData: FormData): void {
    this.mediaService.create(formData)
      .subscribe({
        next: this.handleMediaCreate,
        error: (error: any) => this.snackbarService.error(error?.error?.details)
      });
  }

  private updateMedia(mediaId: string, formData: FormData): void {
    this.mediaService.update(mediaId, formData)
      .subscribe({
        next: this.handleMediaUpdate,
        error: (error: any) => this.snackbarService.error(error?.error?.details)
      });
  }

  private deleteMedia(mediaId: string): void {
    this.mediaService.delete(mediaId)
      .subscribe({
        next: this.handleMediaDelete,
        error: (error: any) => this.snackbarService.error(error?.error?.details)
      });
  }

  private handleMediaCreate = (media: Media): void => {
    this.initialImages.push(media);
    this.handleValuesChange(this.initialImages);
    this.snackbarService.success('File saved successfully');
  }

  private handleMediaUpdate = (media: Media): void => {
    Optional.ofNullable(media)
            .ifPresent((media) => {
              this.currentImage$.next(media);
              const medias: Media[] = this.initialImages.map((img) => img.id === media.id ? media : img);
              this.handleValuesChange(medias, false);
              this.snackbarService.success('File updated successfully');
            });
  }

  private handleMediaDelete = (): void => {
    this.handleValuesChange(
      this.initialImages.filter((img) => img.id !== this.currentImage$.value.id)
    );
    this.snackbarService.success('File deleted successfully');
  }

  private handleImagesInput(images: Media[] | FormControl): void {
    this.control$.next(
      images instanceof Array
        ? new FormControl(images)
        : images
    );
    this.handleValuesChange();
  }

  private handleValuesChange = (images: Media[] = null, changeCurrent: boolean = true): void => {
    const medias: Media[] = images || this.control$.value?.value;
    Optional.ofNullable(medias)
            .tap((images) => this.initialImages = images)
            .filter((images) => images.length > 0)
            .tap((images) => {
              this.hasImage = true;
              changeCurrent && this.currentImage$.next(images[0]);
            })
            .filter((images) => images.length > 1)
            .map((images) => images.slice(1))
            .ifPresentOrElse(
              (images) => {
                this.hasManyImages = true;
                this.otherImages$.next(images);
              },
              () => {
                this.hasImage = this.currentImage$.value && images.length > 0;
                !this.hasImage && this.currentImage$.next(null);
                this.hasManyImages = false;
                this.otherImages$.next([]);
              }
            );
  }

}
