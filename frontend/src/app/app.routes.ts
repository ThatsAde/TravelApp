import { Routes } from '@angular/router';
import { PricingComponent } from './pricing/pricing';
import { HomeComponent } from './home/home';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { guestGuard } from './guards/guest-guard';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'pricing', component: PricingComponent },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] }
];
