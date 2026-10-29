import { Component, inject, OnInit,PLATFORM_ID  } from '@angular/core';
import { FeatureBlog } from '../feature-blog/feature-blog';
import { BlogCard } from '../blog-card/blog-card';
import { Api } from '../services/apiservice/api';
import { isPlatformBrowser } from '@angular/common';
  
@Component({
  selector: 'app-home',
  imports: [FeatureBlog,BlogCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  api_ = inject(Api);
  feature_blog: any;
  recent_blog: any;

 platformId = inject(PLATFORM_ID);


  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    
    this.api_.getAllArticles().subscribe((res)=>{
  console.log('Platform:', isPlatformBrowser(this.platformId)
    ? 'browser'
    : 'server');

  console.log('API response:', res);
      // console.log("xyz",res);
        this.feature_blog = res?.articles[0]; // last is feature blog
        this.recent_blog = res?.articles.slice(1); // recent blogs

    })
  }

}
