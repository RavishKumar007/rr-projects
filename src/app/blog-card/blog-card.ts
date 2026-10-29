import { Component, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [RouterModule],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard implements OnInit {
  data = input<any>();

  ngOnInit(): void {
    console.log("recent -",this.data())
  }
}
