import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogsService } from '../../blogs.service';
import { Blog } from 'src/app/shared/global.models';
@Component({
  selector: 'app-dashboard',
  imports: [BlogCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly blogsService = inject(BlogsService);
  private readonly destroy$ = new Subject<void>();

  // Reactive signals
  loading = signal<boolean>(false);
  blogs = signal<Blog[]>([]);
  error = signal<string | null>(null);

  // Legacy numbers for backward compatibility (remove when template is updated)
  numbers: number[] = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBlogs(): void {
    this.loading.set(true);
    this.error.set(null);

    this.blogsService
      .getAllBlogs()
      .pipe(takeUntil(this.destroy$))
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
