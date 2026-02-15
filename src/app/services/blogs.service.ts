import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Blog, ApiError } from 'src/app/shared/global.models';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = '/blogs';

  // Signals for reactive state management
  private readonly allBlogsSignal = signal<Blog[] | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  // Public computed signals
  public readonly allBlogs = this.allBlogsSignal();
  public readonly loading = this.loadingSignal();
  public readonly hasBlogs = computed(() => {
    const blogs = this.allBlogsSignal();
    return blogs !== null && blogs.length > 0;
  });
  public readonly blogCount = computed(
    () => this.allBlogsSignal()?.length ?? 0,
  );

  constructor() {}

  /**
   * Get all blogs from the API
   * Uses caching to avoid repeated requests
   */
  getAllBlogs(forceRefresh = false): Observable<Blog[]> {
    // Return cached data if available and not forcing refresh
    const cachedBlogs = this.allBlogsSignal();
    if (cachedBlogs && !forceRefresh) {
      console.log('Returning cached blogs');
      // Return cached data as observable
      return new Observable<Blog[]>((subscriber) => {
        subscriber.next(cachedBlogs);
        subscriber.complete();
      });
    }

    this.setLoading(true);

    return this.http.get<Blog[]>(this.API_URL).pipe(
      tap((blogs) => {
        console.log(`Fetched ${blogs.length} blogs from API`);
        this.allBlogsSignal.set(blogs);
        this.setLoading(false);
      }),
      catchError((error) => {
        this.setLoading(false);
        return this.handleError('Failed to fetch blogs', error);
      }),
      shareReplay(1), // Share the result with multiple subscribers
    );
  }

  /**
   * Get a single blog by ID
   */
  getBlogById(id: string): Observable<Blog> {
    if (!id || !this.isValidObjectId(id)) {
      return throwError(() => ({ error: 'Invalid blog ID format' }));
    }

    return this.http.get<Blog>(`${this.API_URL}/${id}`).pipe(
      tap((blog) => console.log(`Fetched blog: ${blog.title}`)),
      catchError((error) =>
        this.handleError(`Failed to fetch blog with ID: ${id}`, error),
      ),
    );
  }

  /**
   * Clear cache (useful for development or after data changes)
   */
  clearCache(): void {
    this.allBlogsSignal.set(null);
    console.log('Blog cache cleared');
  }

  /**
   * Clear backend cache (development endpoint)
   */
  clearBackendCache(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/cache`).pipe(
      tap(() => {
        console.log('Backend cache cleared');
        this.clearCache(); // Also clear frontend cache
      }),
      catchError((error) =>
        this.handleError('Failed to clear backend cache', error),
      ),
    );
  }

  /**
   * Get cached blogs without making API call
   */
  getCachedBlogs(): Blog[] | null {
    return this.allBlogsSignal();
  }

  /**
   * Set loading state manually (useful for external loading indicators)
   */
  setLoading(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  // Private helper methods
  private handleError(
    message: string,
    error: HttpErrorResponse,
  ): Observable<never> {
    console.error(message, error);

    let errorMessage = 'An unknown error occurred';

    if (error.error) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.status === 0) {
      // Network error or server unreachable
      errorMessage = 'Unable to connect to server. Please try again later.';
    } else {
      // Backend error
      errorMessage =
        error.error?.error ||
        `Server Error: ${error.status} - ${error.statusText}`;
    }

    return throwError(
      () =>
        ({
          error: errorMessage,
          status: error.status,
        }) as ApiError,
    );
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
