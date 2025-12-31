import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  imports: [RouterLink],
})
export class NavigationBarComponent {}
