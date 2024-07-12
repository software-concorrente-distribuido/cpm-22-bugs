import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private readonly DESCRIPTION_TAG_NAME: string = 'description';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  public setTitleAndDescription(title: string, description: string): void {
    this.setTitle(title);
    this.setDescription(description);
  }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public setDescription(description: string): void {
    this.metaService.updateTag({ name: this.DESCRIPTION_TAG_NAME, content: description });
  }

}
