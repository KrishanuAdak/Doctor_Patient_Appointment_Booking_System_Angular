import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { LoginRegisterComponent } from './login-regsister/login-regsister.component';
import { authGuard } from './auth.guard';
import { AvailibityServiceComponent } from './availibity-service/availibity-service.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';

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
        component: LoginRegisterComponent
        // loadComponent: () => import('./login-regsister/login-regsister.component').then(m => m.LoginRegsisterComponent)
    },
    {
        path:'home',
        component: HomeComponent,

    },
    {
        path:'services',
        component:ServicesComponent
    },{
        path:'available',
        component:AvailibityServiceComponent,
        // loadComponent: () => import('./availability/availability.component').then(m => m.AvailabilityComponent),
        canActivate:[authGuard]
    },{
        path:'appointments',
        loadComponent: () => import('./appointment-booking/appointment-booking.component').then(m => m.AppointmentBookingComponent),
        canActivate:[authGuard]
    },{
        path:'accounts',
        component:BasicDetailsComponent,
        canActivate:[authGuard]
    }
];
