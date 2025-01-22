import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ProductsListComponent } from './main/products/components/products-list/products-list.component';
import { UsersListComponent } from './main/users/components/users-list/users-list.component';
import { authGuard } from './shared/guards/auth.guard';
import { loginGuard } from './shared/guards/login.guard';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
    { 'path': 'login', component: LoginComponent, canActivate: [loginGuard] },
    {
        'path': 'home', component: SidebarComponent, canActivate: [authGuard], 'children': [

            { 'path': 'products', component: ProductsListComponent },
            { 'path': 'users', component: UsersListComponent, canActivate: [roleGuard] },
            { 'path': '', 'redirectTo': 'products', 'pathMatch': 'prefix' }
        ]
    },
    { 'path': '', 'redirectTo': 'login', 'pathMatch': 'prefix' },
];
