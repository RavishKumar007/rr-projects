import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'article/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/articles/:id/edit',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/article/preview/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
