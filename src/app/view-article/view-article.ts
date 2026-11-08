import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from '../services/articleservice/articleservice';
import { Api } from '../services/apiservice/api';
// 1. Import the specific presentation component from ngx-quill
import { QuillViewHTMLComponent  } from 'ngx-quill';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [CommonModule, RouterLink,QuillViewHTMLComponent  ],
  templateUrl: './view-article.html',
  styleUrl: './view-article.css'
})
export class ArticleView implements OnInit {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  article: any = null;
  loading = true;
  error = '';
  isPreview = false;
  readingTime = 1;

  articleService = inject(ArticleService);
  apiService = inject(Api)

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const slug = params.get('slug');

      if (id) {
        this.isPreview = true;
        this.getAdminArticle(Number(id));
      } else if (slug) {
        this.isPreview = false;
        this.getPublicArticle(slug);
      }
    });
  }

  getPublicArticle(slug: string) {
    this.loading = true;
    this.error = '';

    this.articleService.getArticleBySlug(slug).subscribe({
      next: (response) => {
        this.article = response.data ?? response.article ?? response;
        this.calculateReadingTime();
        this.loading = false;
      },
      error: (err) => {
        console.error('Article fetch error:', err);
        this.error = err.status === 404
          ? 'Article not found.'
          : 'Unable to load this article. Please try again.';
        this.loading = false;
      }
    });
  }

  getAdminArticle(id: number) {
    this.loading = true;
    this.error = '';

    this.apiService.getArticleByIdForAdmin(id).subscribe({
      next: (response: any) => {
        this.article = response.data ?? response.article ?? response;
        this.calculateReadingTime();
        this.loading = false;
      },
      error: (err) => {
        console.error('Admin article fetch error:', err);
        this.error = 'Unable to load article preview.';
        this.loading = false;
      }
    });
  }

  calculateReadingTime() {
    if (!this.article?.content) {
      this.readingTime = 1;
      return;
    }

    const text = this.article.content.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;

    this.readingTime = Math.max(1, Math.ceil(words / 200));
  }

  get formattedDate() {
    const date = this.article?.published_at || this.article?.created_at;

    return date ? new Date(date) : null;
  }

  async copyArticleLink() {
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href);
    }
  }
}
