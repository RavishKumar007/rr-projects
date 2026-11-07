import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
article_slug_api = BASE_URL + '/articles';
http = inject(HttpClient);

getArticleBySlug(slug: string): Observable<any> {
  return this.http.get(`${this.article_slug_api}/${slug}`);
}

}
