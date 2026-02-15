import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from 'src/app/shared/global.models';

@Component({
  selector: 'app-blog-page',
  imports: [BackButtonComponent, CommonModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  standalone: true,
})
export class BlogPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogsService = inject(BlogsService);
  private readonly destroyRef = inject(DestroyRef);

  // Reactive signals
  blogId = signal<string | null>(null);
  blog = signal<Blog | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogId.set(id);

    if (id) {
      this.fetchBlogData(id);
    } else {
      this.error.set('No blog ID provided');
    }
  }

  private fetchBlogData(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    console.log('Fetching blog data for ID:', id);

    this.blogsService
      .getBlogById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blog) => {
          this.blog.set(blog);
          this.loading.set(false);
          console.log('Loaded blog:', blog.title);
        },
        error: (error) => {
          this.error.set(error.error || 'Failed to load blog');
          this.loading.set(false);
          console.error('Error loading blog:', error);
        },
      });
  }

  /**
   * Retry loading the blog
   */
  retryLoad(): void {
    const id = this.blogId();
    if (id) {
      this.fetchBlogData(id);
    }
  }
}
