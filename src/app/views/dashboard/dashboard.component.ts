import { Component, OnInit, signal } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [BlogCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  loading = signal<boolean>(false);
  // get blog posts
  numbers: number[] = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10];
  ngOnInit(): void {
    this.loading.set(true);
    this.loading.set(false);
  }
}
