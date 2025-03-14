import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: false,
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  @Input() public content?: string = '';
}
