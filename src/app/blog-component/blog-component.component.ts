import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-blog-component',
  standalone: true,
  imports: [],
  templateUrl: './blog-component.component.html',
  styleUrl: './blog-component.component.scss'
})
export class BlogComponentComponent {
@Input() title?: string;
@Input() id?: number;
@Input() body?: string;
}
