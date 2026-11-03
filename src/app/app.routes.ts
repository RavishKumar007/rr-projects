import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AdminPanel } from './admin-panel/admin-panel';
import { AdminLogin } from './admin-panel/admin-login/admin-login';
import { Navbar } from './navbar/navbar';
import { authGuard } from './guard/auth-guard'
import { guestguardGuard } from './guard/guestguard/guestguard-guard';

export const routes: Routes = [
    {path:'',component:Navbar,
        children:[
            {path:'',component: Home}
        ]
    },
    {   path:'admin', 
        loadChildren: () => import('./admin-panel/admin-routes.routes').then(m => m.adminRoutes)
    },
    {
        path: "**",
        redirectTo: ''
    }
];
