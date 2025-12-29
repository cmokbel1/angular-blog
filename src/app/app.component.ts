import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { NavigationFooterComponent } from './shared/navigation-footer/navigation-footer.component';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavigationBarComponent, NavigationFooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  loading: Observable<boolean> | undefined
  title = 'angular-blog';
}
