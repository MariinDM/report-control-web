import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ProductsListComponent } from './main/products/components/products-list/products-list.component';
import { UsersListComponent } from './main/users/components/users-list/users-list.component';

export const routes: Routes = [
    { 'path': 'login', component: LoginComponent },
    {
        'path': 'home', component: SidebarComponent, 'children': [

            { 'path': 'products', component: ProductsListComponent },
            { 'path': 'users', component: UsersListComponent },
            { 'path': '', 'redirectTo': 'products', 'pathMatch': 'prefix' }
        ]
    },
    { 'path': '', 'redirectTo': 'login', 'pathMatch': 'prefix' },
];
