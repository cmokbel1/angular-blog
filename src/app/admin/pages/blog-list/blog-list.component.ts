import { Component, OnInit, signal, inject, DestroyRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogsService } from '../../../services/blogs.service';
import { Blog } from '../../../shared/global.models';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  private readonly blogsService = inject(BlogsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly loading = signal(false);
  readonly blogs = signal<Blog[]>([]);
  readonly deletingId = signal<string | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loading.set(true);
    this.blogsService
      .getAllBlogs(true)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blogs) => { this.blogs.set(blogs); this.loading.set(false); },
        error: () => this.loading.set(false),
      });
  }

  confirmDelete(blog: Blog): void {
    if (!confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;

    this.deletingId.set(blog._id);
    this.blogsService
      .deleteBlog(blog._id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.blogs.update(list => list.filter(b => b._id !== blog._id));
          this.deletingId.set(null);
        },
        error: () => this.deletingId.set(null),
      });
  }
}
