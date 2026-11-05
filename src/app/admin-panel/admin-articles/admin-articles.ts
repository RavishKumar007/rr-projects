
import { Component, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Api } from '../../services/apiservice/api';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-articles.html'
})
export class AdminArticles implements OnDestroy {

  articles = signal<any[]>([]);

  counts = signal({
    total: 0,
    published: 0,
    drafted: 0
  });

  filteredTotal = signal(0);

  loading = signal(true);
  error = signal('');

  currentPage = signal(1);
  pageSize = 10;

  searchTerm = signal('');

  Math = Math;

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  totalPages = computed(() =>
    Math.ceil(this.filteredTotal() / this.pageSize)
  );

  constructor(private api: Api) {

    this.loadArticles();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage.set(1);
      this.loadArticles();
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
    this.searchSubject.next(value.trim());
  }

  loadArticles() {
    this.loading.set(true);
    this.error.set('');

    const body = {
      limit: this.pageSize,
      offset: (this.currentPage() - 1) * this.pageSize,
      search: this.searchTerm().trim()
    };

    this.api.getArticlesForAdmin(body).subscribe({
      next: (res: any) => {
        this.articles.set(res.articles || []);

        this.counts.set(res.counts || {
          total: 0,
          published: 0,
          drafted: 0
        });

        this.filteredTotal.set(
          res.filteredTotal ?? res.articles.length ?? 0
        );

        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading articles:', err);
        this.error.set('Unable to load articles. Please try again.');
        this.loading.set(false);
      }
    });
  }

  previousPage() {
    if (this.currentPage() > 1 && !this.loading()) {
      this.currentPage.update(page => page - 1);
      this.loadArticles();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() && !this.loading()) {
      this.currentPage.update(page => page + 1);
      this.loadArticles();
    }
  }

  deleteArticle(article: any) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${article.title}"?`
    );

    if (!confirmed) return;

    // Connect your existing delete API method here.
  }
}
