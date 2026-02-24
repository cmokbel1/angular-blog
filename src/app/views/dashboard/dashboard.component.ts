import {
  Component,
  OnInit,
  signal,
  inject,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from 'src/app/shared/global.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-dashboard',
  imports: [BlogCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  private readonly blogsService = inject(BlogsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Reactive signals
  loading = signal<boolean>(false);
  blogs = signal<Blog[]>([]);
  error = signal<string | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadBlogs();
  }

  private loadBlogs(): void {
    this.loading.set(true);
    this.error.set(null);

    this.blogsService
      .getAllBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blogs) => {
          this.blogs.set(blogs);
          this.loading.set(false);
          console.log('Loaded blogs:', blogs.length);
        },
        error: (error) => {
          this.error.set(error.error || 'Failed to load blogs');
          this.loading.set(false);
          console.error('Error loading blogs:', error);
        },
      });
  }

  /**
   * Refresh blogs data
   */
  refreshBlogs(): void {
    this.loadBlogs();
  }

  /**
   * Force refresh by clearing cache
   */
  forceRefreshBlogs(): void {
    this.blogsService.clearCache();
    this.loadBlogs();
  }
}
