import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
@Component({
  selector: 'app-blog-page',
  imports: [BackButtonComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  standalone: true,
})
export class BlogPageComponent implements OnInit {
  blogId: string | null = '';
  loading = signal<boolean>(false);
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loading.set(true);
    this.blogId = this.route.snapshot.paramMap.get('id');
    // Use the blogId to fetch data or perform other actions
    this.fetchBlogData(this.blogId);
    this.loading.set(false);
  }

  private fetchBlogData(id: string | null) {
    console.log('fetching blog data beep boop robit');
  }
}
