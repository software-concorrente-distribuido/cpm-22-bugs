import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MediaService } from '../../../../core/services/media.service';
import { Media } from '../../../../core/models/media/media.model';
import { Optional } from '../../../../core/utils/optional';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'ether-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {

  public control$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  public currentImage$: BehaviorSubject<Media> = new BehaviorSubject<Media>(null);

  public otherImages$: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>(null);

  public viewOnly: boolean = false;

  private initialImages: Media[] = [];

  @Input()
  public set imagesControl(value: Media[] | FormControl) {
    this.handleImagesInput(value);
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

  private handleMediaCreate = (media: Media): void => {
    const otherImages: Media[] = this.otherImages$.value;
    this.initialImages.push(media);
    otherImages.push(media);
    this.otherImages$.next(otherImages);
    this.snackbarService.success('File saved successfully');
  }

  private handleMediaUpdate = (media: Media): void => {
    Optional.ofNullable(media)
            .ifPresent((media) => {
              this.currentImage$.next(media);
              this.snackbarService.success('File updated successfully');
            });
  }

  private handleImagesInput(images: Media[] | FormControl): void {
    this.control$.next(
      images instanceof Array
        ? new FormControl(images)
        : images
    );
    Optional.ofNullable(images)
            .map((images) => images instanceof Array ? images : images.value)
            .tap((images) => this.initialImages = images)
            .filter((images) => images.length > 0)
            .tap((images) => this.currentImage$.next(images[0]))
            .filter((images) => images.length > 1)
            .map((images) => images.slice(1))
            .ifPresent((images) => this.otherImages$.next(images));
  }

  private handleValuesChange = (images: Media[]): void => {
    this.control$.value?.setValue(images);
  }

}
