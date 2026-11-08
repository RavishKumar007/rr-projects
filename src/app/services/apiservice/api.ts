import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class Api {

  http = inject(HttpClient);

  article_api : string = BASE_URL + '/articles';
  admin_artiles : string = BASE_URL + '/admin/getarticles';
  admin_cat: string = BASE_URL + '/admin/getcategories';
  article_by_id : string = BASE_URL + '/admin/getarticlebyid';
  create_url : string = BASE_URL + '/admin/createarticle';
  update_url : string = BASE_URL + '/admin/updatearticle';
  create_category_api : string = BASE_URL + '/admin/createcategory'

  getAllArticles(body:any = {limit : 4},url?:string):Observable<any>{
   return  this.http.post(this.article_api,body).pipe(
      tap((data)=>{
        // console.log("articles : ",data);
      })
    )
  }

  getArticlesForAdmin(body?:any,url?:string){
    const url_ = url ?? this.admin_artiles;
    return this.http.post(url_, body);
  }

    getCategoriesForAdmin(body?:any,url?:string){
    const url_ = url ?? this.admin_cat;
    return this.http.post(url_, body);
  }

  getArticleByIdForAdmin(id?:any,url?:string){
    const url_ = url ?? this.article_by_id;
    return this.http.post(url_,{id});
  }

  updateArticle(id:any,body:any){
    return  this.http.post(this.update_url+ "/"+id,body);

  }

  createArticle(body:any){
    // console.log("body : ",body)
    return this.http.post(this.create_url,body);

  }

  createCategory(body:any){
    return this.http.post(this.create_category_api,body);
  }

}
