import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../shared/global.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly loginSlug: string = `${environment.apiBaseUrl}/login`;

  loginUser(credentials: User): void {
    // Implement login logic here, e.g., send credentials to the backend
    console.log('Login function called');
  }
  constructor() {}
}
