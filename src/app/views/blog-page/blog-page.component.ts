import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit {
  blogId:string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    // Use the blogId to fetch data or perform other actions
    this.fetchBlogData(this.blogId);
  }
  
  private fetchBlogData(id:string | null) {
    console.log('fetching blog data beep boop robit');
  }
}
