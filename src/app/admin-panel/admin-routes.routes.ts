import { Routes } from '@angular/router';
import { guestguardGuard } from '../guard/guestguard/guestguard-guard';
import { authGuard } from '../guard/auth-guard';
import { AdminLogin } from './admin-login/admin-login';
import { AdminPanel } from './admin-panel';
import { ArticleForm } from './article-form/article-form';
import { AdminArticles } from './admin-articles/admin-articles';

export const adminRoutes: Routes = [
  { path: '', component: AdminPanel, canActivate: [authGuard] },
  { path: 'login', component: AdminLogin, canActivate: [guestguardGuard] },
  {
    path: 'articles/new',
    component: ArticleForm
  },
  {
    path: 'articles/:id/edit',
    component: ArticleForm
  },
  {
    path: 'articles',
    component: AdminArticles
  },
  { path: "**", redirectTo: "" }

];
