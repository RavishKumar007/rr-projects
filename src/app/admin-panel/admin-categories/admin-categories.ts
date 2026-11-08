
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/apiservice/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  imports: [FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {

  private api = inject(Api);

  categories: any[] = [];
  loading = false;
  saving = false;

  showAddCategory = false;
  errorMessage = '';

  newCategory = {
    name: '',
    slug: '',
    description: ''
  };

  private location = inject(Location);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;

    this.api.getCategoriesForAdmin({}).subscribe({
      next: (res: any) => {
        this.categories = (res.data || []).sort(
          (a: any, b: any) => a.id - b.id
        );
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
        this.loading = false;
      }
    });
  }

  openAddCategory() {
    this.newCategory = {
      name: '',
      slug: '',
      description: ''
    };
    this.errorMessage = '';
    this.showAddCategory = true;
  }

  closeAddCategory() {
    if (this.saving) return;
    this.showAddCategory = false;
  }

  saveCategory() {
    if (!this.newCategory.name.trim() || !this.newCategory.slug.trim()) {
      this.errorMessage = 'Category name and slug are required.';
      return;
    }

    const payload = {
      name: this.newCategory.name.trim(),
      slug: this.newCategory.slug.trim(),
      description: this.newCategory.description.trim()
    };

    this.saving = true;
    this.errorMessage = '';

    this.api.createCategory(payload).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.showAddCategory = false;
        this.getCategories();
      },
      error: (err: any) => {
        console.error('Error creating category:', err);
        this.errorMessage =
          err.error?.message || 'Unable to create category. Please try again.';
        this.saving = false;
      }
    });
  }

goBack() {
  this.location.back();
}
}
