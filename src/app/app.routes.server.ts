import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    // All admin pages: Client-side rendering
  {
    path: 'admin',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
 // Individual blog articles: Server-side rendering
  {
    path: 'article/:slug',
    renderMode: RenderMode.Server
  },
    // All remaining public pages: Server-side rendering
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
