import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  imports: [RouterLink, ButtonModule],
})
export class NavigationBarComponent {}
