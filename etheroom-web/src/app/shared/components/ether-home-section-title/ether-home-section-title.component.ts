import { Component, Input } from '@angular/core';

@Component({
  selector: 'ether-home-section-title',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div class="main-title">{{ title }}</div>
      <div class="sub-title">{{ title }}</div>
    </section>
  `,
  styleUrl: './ether-home-section-title.component.scss'
})
export class EtherHomeSectionTitleComponent {
  
  @Input()
  title?: string;

}
