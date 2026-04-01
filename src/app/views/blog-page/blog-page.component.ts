import { Component, OnInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from 'src/app/shared/global.models';

@Component({
  selector: 'app-blog-page',
  imports: [BackButtonComponent, CommonModule, RouterLink],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  standalone: true,
})
export class BlogPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogsService = inject(BlogsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  blogId = signal<string | null>(null);
  blog = signal<Blog | null>(null);
  allBlogs = signal<Blog[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  readonly otherBlogs = computed(() => {
    const currentId = this.blogId();
    return this.allBlogs().filter(b => b._id !== currentId);
  });

  readonly paragraphs = computed(() => {
    const content = this.blog()?.content;
    if (!content) return [];
    return content.split(/\n\n+/).filter(p => p.trim());
  });

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.getAllBlogs();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params.get('id');
        this.blogId.set(id);

        if (id) {
          this.fetchBlogData(id);
        } else {
          this.error.set('No blog ID provided');
        }
      });
  }

  private getAllBlogs(): void {
      this.blogsService
      .getAllBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blogs) => this.allBlogs.set(blogs),
        error: () => {},
      });
  }
  private fetchBlogData(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.blogsService
      .getBlogById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blog) => {
          this.blog.set(blog);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error.error || 'Failed to load blog');
          this.loading.set(false);
        },
      });
  }

  retryLoad(): void {
    const id = this.blogId();
    if (id) {
      this.fetchBlogData(id);
    }
  }
}
