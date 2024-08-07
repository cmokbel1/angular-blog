import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
@Input() title?: string;
@Input() id?: number;
@Input() body?: string;
}
