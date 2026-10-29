import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SafeStorageService } from '../storageservice/storage';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient)
  login_api: string = BASE_URL + '/admin/login';
  storage_ = inject(SafeStorageService);

  login(body?:any,url?:string){
    const url_ = url ? url : this.login_api;
    return this.http.post(url_,body);
  }

  isLoggedIn(){
    const isLoggedIn = this.storage_.getItem("isLoggedIn");
    // console.log("islogged in : ",isLoggedIn)
    return !!(isLoggedIn === 'true');
  }

  setLogin(token:string){
    this.storage_.setItem('isLoggedIn',token);
  }
  
}
