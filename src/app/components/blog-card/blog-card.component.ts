import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  id = input<string | null>('');
  title = input<string>('');
  excerpt = input<string | undefined>('');
  author = input<string>('');
  createdAt = input<Date | string | undefined>(undefined);
  tags = input<string[]>([]);
}
