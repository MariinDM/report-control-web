import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  private authService = inject(AuthService);
  private localStorage = inject(LocalstorageService);
  private router = inject(Router);
  user: any;

  constructor() {
    this.user = this.localStorage.getJsonItem('user');
  }

  logOut(): void {
    this.authService.logout();
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
