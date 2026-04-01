import { Component, OnInit, signal, inject, DestroyRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogsService } from '../../../services/blogs.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
})
export class BlogFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly blogsService = inject(BlogsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly editId = signal<string | null>(null);
  readonly isEditMode = () => this.editId() !== null;
  readonly saving = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly tagInput = signal('');

  readonly form = this.fb.group({
    title:     ['', [Validators.required, Validators.minLength(3)]],
    content:   ['', [Validators.required, Validators.minLength(10)]],
    excerpt:   [''],
    author:    ['', Validators.required],
    tags:      [[] as string[]],
    published: [true],
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.loadBlog(id);
    }
  }

  private loadBlog(id: string): void {
    this.loading.set(true);
    this.blogsService
      .getBlogById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blog) => {
          this.form.patchValue({
            title:     blog.title,
            content:   blog.content,
            excerpt:   blog.excerpt ?? '',
            author:    blog.author,
            tags:      blog.tags,
            published: blog.published !== false,
          });
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load post.');
          this.loading.set(false);
        },
      });
  }

  get tags(): string[] {
    return this.form.get('tags')?.value ?? [];
  }

  addTag(): void {
    const value = this.tagInput().trim().toLowerCase();
    if (!value || this.tags.includes(value)) {
      this.tagInput.set('');
      return;
    }
    this.form.patchValue({ tags: [...this.tags, value] });
    this.tagInput.set('');
  }

  removeTag(tag: string): void {
    this.form.patchValue({ tags: this.tags.filter(t => t !== tag) });
  }

  onTagKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const data = this.form.getRawValue();
    const id = this.editId();

    const request$ = id
      ? this.blogsService.updateBlog(id, data)
      : this.blogsService.createBlog(data);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.router.navigate(['/admin/blogs']),
      error: (err) => {
        this.error.set(err?.error ?? 'Failed to save post.');
        this.saving.set(false);
      },
    });
  }
}
