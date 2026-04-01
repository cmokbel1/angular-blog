import { Component, OnInit, signal, inject, DestroyRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogsService } from '../../../services/blogs.service';
import { Blog } from '../../../shared/global.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  private readonly blogsService = inject(BlogsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly loading = signal(false);
  readonly blogs = signal<Blog[]>([]);

  readonly totalPosts = () => this.blogs().length;
  readonly publishedPosts = () => this.blogs().filter(b => b.published !== false).length;
  readonly recentPosts = () =>
    [...this.blogs()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loading.set(true);
    this.blogsService
      .getAllBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blogs) => { this.blogs.set(blogs); this.loading.set(false); },
        error: () => this.loading.set(false),
      });
  }
}
