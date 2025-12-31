import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  title = input<string>('init');
  id = input<number | null>(1);
  excerpt = input<string | undefined>('');
  createdAt: string = 'Oct 5th, 2024';
}
