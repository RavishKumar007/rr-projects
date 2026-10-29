import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Userservice {

  getDetails = BASE_URL + '/admin/userdetails';
  http = inject(HttpClient);

  getUserDetails(url?:string){
    const url_ = url ? url : this.getDetails;
    return this.http.get(url_);
  }
  
}
