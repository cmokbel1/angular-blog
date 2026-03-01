import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { NavigationFooterComponent } from './shared/navigation-footer/navigation-footer.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationBarComponent,
    NavigationFooterComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  loading = signal<boolean>(false);
  title = 'angular-blog';

  constructor() {
    this.authService.hydrateAuthState();
  }
}
