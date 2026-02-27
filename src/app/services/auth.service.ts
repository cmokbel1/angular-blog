import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestCredentials } from '../shared/global.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly loginSlug: string = `${environment.apiBaseUrl}/login`;
  private readonly registerSlug: string = `${environment.apiBaseUrl}/login/register`;

  registerUser(registerCredentials: RequestCredentials): void {
    this.http.post(this.registerSlug, registerCredentials).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
    });
  }
  loginUser(credentials: RequestCredentials): void {
    this.http.post(this.loginSlug, credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
  constructor() {}
}
