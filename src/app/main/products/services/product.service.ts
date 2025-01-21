import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private env = environment.apiUrl;

  constructor() { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.env}products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.env}products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.post<any>(`${this.env}products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.env}products/${id}`);
  }
}
