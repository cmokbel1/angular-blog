import { Component, OnInit, signal } from '@angular/core';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  loading = signal<boolean>(false);
// get blog posts

ngOnInit(): void {
    this.loading.set(true);
    this.loading.set(false);
}
}
