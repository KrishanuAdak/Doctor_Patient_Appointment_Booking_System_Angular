import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { LoginRegsisterComponent } from './login-regsister/login-regsister.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // {
    //     path:'**',
    //     redirectTo: 'home',
  
    // },
    {
        path:'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate:[authGuard]

    },
    {
        path:'login/register',
        component: LoginRegsisterComponent
        // loadComponent: () => import('./login-regsister/login-regsister.component').then(m => m.LoginRegsisterComponent)
    },
    {
        path:'home',
        component: HomeComponent,

    },
    {
        path:'services',
        component:ServicesComponent
    }
];
