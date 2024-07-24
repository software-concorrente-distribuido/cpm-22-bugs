import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ImagesComponent } from './images/images.component';



@NgModule({
  declarations: [
    ThumbnailComponent,
    ImagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThumbnailComponent,
    ImagesComponent
  ]
})
export class MediaModule { }
