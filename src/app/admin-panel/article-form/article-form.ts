import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { QuillModule } from 'ngx-quill';
import { Api } from '../../services/apiservice/api';

@Component({
  selector: 'app-article-form',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    QuillModule,
    FormsModule
  ],
  templateUrl: './article-form.html',
  styleUrl: './article-form.css',
})
export class ArticleForm implements OnInit {
   private fb = inject(FormBuilder);
  private apiService = inject(Api)
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articleId: number | null = null;

  isEditMode = false;
  isSaving = signal(false);

  categories = signal<any[]>([]);
  selectedImage = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  tags = signal<string[]>([]);
  tagInput = '';

  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    category_id: ['', Validators.required],
    content: ['', Validators.required],
    excerpt: ['', Validators.required],
    status: ['draft']
  });

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }, { header: 3 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link', 'image'],
      [{ align: [] }],
      ['clean']
    ]
  };

  ngOnInit() {
    this.loadCategories();

    this.articleId = Number(this.route.snapshot.paramMap.get('id')) || null;
    this.isEditMode = !!this.articleId;

    this.form.controls.title.valueChanges.subscribe(title => {
      if (!this.isEditMode) {
        this.form.controls.slug.setValue(this.generateSlug(title || ''), {
          emitEvent: false
        });
      }
    });

    if (this.articleId) {
      this.loadArticle(this.articleId);
    }
  }

  loadCategories() {
    this.apiService.getCategoriesForAdmin({}).subscribe({
      next: (res:any) => {
        console.log("categories ",res)
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log("error while get categories for admin",err)
      }
    });
  }

  loadArticle(id: number) {
    this.apiService.getArticleByIdForAdmin(id).subscribe({
      next: (res: any) => {
        const article = res.data ?? res;

        this.form.patchValue({
          title: article.title,
          slug: article.slug,
          category_id: String(article.category_id),
          content: article.content,
          excerpt: article.excerpt,
          status: article.status
        });

        this.tags.set(article.tags ?? []);

        if (article.cover_image) {
          this.imagePreview.set(article.cover_image);
        }
      }
    });
  }

  generateSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  addTag() {
    const tag = this.tagInput.trim();

    if (tag && !this.tags().some(t => t.toLowerCase() === tag.toLowerCase())) {
      this.tags.update(current => [...current, tag]);
    }

    this.tagInput = '';
  }

  removeTag(tag: string) {
    this.tags.update(current => current.filter(t => t !== tag));
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image.');
      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5 MB.');
      input.value = '';
      return;
    }

    this.selectedImage.set(file);

    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.selectedImage.set(null);
    this.imagePreview.set(null);
  }

  saveArticle(status: 'draft' | 'published') {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const formData = new FormData();

    const article = {
      ...this.form.getRawValue(),
      status,
      tags: this.tags()
    };
    console.log("artiles ",article)
    Object.entries(article).forEach(([key, value]) => {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    });

    const image = this.selectedImage();
    if (image) {
      formData.append('cover_image', image);
    }
    console.log("form data : ",formData)

    const request = this.isEditMode
      ? this.apiService.updateArticle(this.articleId!, formData)
      : this.apiService.createArticle(formData);

    request.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/admin/articles']);
      },
      error: error => {
        this.isSaving.set(false);
        console.error('Error saving article:', error);
      }
    });
  }

}
