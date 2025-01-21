import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterface } from '../auth-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private env = environment.apiUrl;
  private http = inject(HttpClient);

  login(auth: AuthInterface): Observable<any> {
    return this.http.post<any>(`${this.env}login`, auth);
  }

  logout(): void {
    localStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }
}
