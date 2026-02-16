import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../shared/global.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly loginSlug: string = '/login';

  loginUser(credentials: User): void {
    // Implement login logic here, e.g., send credentials to the backend
    console.log('Login function called');
  }
  constructor() {}
}
