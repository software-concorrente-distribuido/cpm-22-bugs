import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MediaService } from '../../../../core/services/media.service';

@Component({
  selector: 'ether-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {

  public control$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  @Input()
  public set imagesControl(value: FormControl) {
    this.control$.next(value);
  }

  constructor(
    private mediaService: MediaService
  ) {

  }

}
