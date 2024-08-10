import { Routes } from '@angular/router';
import { BlogPageComponent } from './views/blog-page/blog-page.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
        { path: '', component: DashboardComponent },
        { path: 'blog/:id', component: BlogPageComponent }
];
