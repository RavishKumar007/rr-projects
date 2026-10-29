import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Userservice } from '../services/userservice/userservice';
import { Auth } from '../services/authservice/auth';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit{

  userDetails = inject(Userservice);
  router = inject(Router);
  authservice = inject(Auth);
  loader = true;

  ngOnInit(): void {
    this.getdetails();
  }

  getdetails(){
    this.userDetails.getUserDetails().subscribe((res)=>{
      console.log("user details ",res);
      this.authservice.setLogin("true");
      this.loader = false;
      
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
     
}
