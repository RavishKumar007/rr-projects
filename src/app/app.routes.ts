import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AdminPanel } from './admin-panel/admin-panel';
import { AdminLogin } from './admin-panel/admin-login/admin-login';
import { Navbar } from './navbar/navbar';
import { authGuard } from './guard/auth-guard'
import { guestguardGuard } from './guard/guestguard/guestguard-guard';
import { ArticleView } from './view-article/view-article';

export const routes: Routes = [
    {path:'',component:Navbar,
        children:[
            {path:'',component: Home},

        ]
    },
    {path:'article/:slug', loadComponent: ()=> import('./view-article/view-article').then(c =>c.ArticleView)},
    {   path:'admin',
        loadChildren: () => import('./admin-panel/admin-routes.routes').then(m => m.adminRoutes)
    },
    {
        path: "**",
        redirectTo: ''
    }
];
