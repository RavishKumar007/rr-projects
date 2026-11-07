import { Component, OnInit, inject } from '@angular/core';
import { Api } from '../../services/apiservice/api';

@Component({
  selector: 'app-admin-categories',
  imports: [],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {

  private api = inject(Api);

  categories: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;

    this.api.getCategoriesForAdmin({}).subscribe({
      next: (res: any) => {
          this.categories = (res.data || []).sort((a: any, b: any) => a.id - b.id);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
        this.loading = false;
      }
    });
  }

  addCategory() {
    // Add category functionality will be implemented later
  }
}
