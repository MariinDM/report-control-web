import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private env = environment.apiUrl;

  constructor() { }

  getUsers() {
    return this.http.get<any>(`${this.env}users`);
  }

  addUser(user: any) {
    return this.http.post<any>(`${this.env}users`, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put<any>(`${this.env}users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.env}users/${id}`);
  }
}
