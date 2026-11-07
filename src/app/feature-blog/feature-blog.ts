import { Component, input, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-blog',
  imports: [RouterModule],
  templateUrl: './feature-blog.html',
  styleUrl: './feature-blog.css',
})
export class FeatureBlog implements OnInit {

  data =  input<any>();

  ngOnInit(): void {
    console.log("feature ",this.data())
  }

}
