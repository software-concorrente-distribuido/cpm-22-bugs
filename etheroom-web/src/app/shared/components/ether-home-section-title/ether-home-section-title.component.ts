import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-home-section-title',
  standalone: true,
  imports: [],
  template: `
    <h1>{{ title }}</h1>
    <h2>{{ title }}</h2>
  `,
  styleUrl: './ether-home-section-title.component.scss'
})
export class EtherHomeSectionTitleComponent {
  
  @Input()
  title?: string;

}
