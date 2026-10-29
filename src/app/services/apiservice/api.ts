import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  http = inject(HttpClient);

  article_api : string = 'http://localhost:7777/api/articles';

  getAllArticles(url?:string):Observable<any>{
   return  this.http.get(this.article_api).pipe(
      tap((data)=>{
        // console.log("articles : ",data);
      })
    )
  }
  
}
