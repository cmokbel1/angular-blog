import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-blog-card',
    imports: [RouterModule],
    templateUrl: './blog-card.component.html',
    styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
@Input() title?: string;
@Input() id?: number;

 createdAt:string = 'Oct 5th, 2024'
}
