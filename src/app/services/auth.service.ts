import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  AuthUser,
  LoginResponse,
  RequestCredentials,
} from '../shared/global.models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loginSlug: string = `${environment.apiBaseUrl}/login`;
  private readonly registerSlug: string = `${environment.apiBaseUrl}/login/register`;
  private readonly authStorageKey = 'auth_user';

  private readonly currentUserSignal = signal<AuthUser | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  registerUser(registerCredentials: RequestCredentials): Observable<unknown> {
    return this.http.post(this.registerSlug, registerCredentials);
  }

  loginUser(credentials: RequestCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginSlug, credentials).pipe(
      tap((response) => {
        this.setCurrentUser(response.user);
      }),
    );
  }

  logoutUser(): void {
    this.currentUserSignal.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.authStorageKey);
    }
  }

  hydrateAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedUser = localStorage.getItem(this.authStorageKey);
    if (!storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as AuthUser;
      this.currentUserSignal.set(parsedUser);
    } catch {
      localStorage.removeItem(this.authStorageKey);
      this.currentUserSignal.set(null);
    }
  }

  private setCurrentUser(user: AuthUser): void {
    this.currentUserSignal.set(user);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.authStorageKey, JSON.stringify(user));
    }
  }

  constructor() {}
}
