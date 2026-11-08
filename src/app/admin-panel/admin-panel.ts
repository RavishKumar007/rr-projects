import { Component, inject, OnInit,PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Userservice } from '../services/userservice/userservice';
import { Auth } from '../services/authservice/auth';
import { Api } from '../services/apiservice/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit{

  private platformId = inject(PLATFORM_ID);
  userDetails = inject(Userservice);
  apiService = inject(Api)
  router = inject(Router);
  authservice = inject(Auth);
  loader = true;
  user : any;
  articles : any;
  counts: any;
  categories : any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){

      this.getdetails();
      this.getArticles();
      this.getCategories();
    }
  }

  getdetails(){
    this.userDetails.getUserDetails().subscribe((res:any)=>{
      console.log("user details ",res);
      this.authservice.setLogin("true");
      this.loader = false;
      this.user = res?.data;

    }, (error) => {
      // console.log("user detail error : ",error)
       this.authservice.setLogin("false");
      if(error.status == 401){
        this.router.navigate(['/admin/login']);
      } else {
        this.loader = true;

      }
    })
  }

  getArticles(limit:number = 5){
    const body = {
      limit
    }
    this.apiService.getArticlesForAdmin(body).subscribe({
      next: (res:any) => {
        this.articles = res.articles;
        this.counts = res.counts;
        // console.log("articles ",res)
      },
      error: (err) => {
        console.log("error while get articles for admin",err)
      }
    })
  }
  getCategories(){
    this.apiService.getCategoriesForAdmin({}).subscribe({
      next: (res:any) => {
        // console.log("categories ",res)
        this.categories = res.data;
      },
      error: (err) => {
        console.log("error while get categories for admin",err)
      }
    })
  }

  logout(){
    this.authservice.logout().subscribe((res)=>{
      console.log("logout successfull !");
      this.router.navigate(['/']);
    },(err)=> {
      console.log("error while logout",err);
      this.router.navigate(['/']);
    })
  }

}
