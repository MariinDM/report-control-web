import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private http = inject(HttpClient);
  private env = environment.apiUrl;

  constructor() { }

  exportFiles(type: string): Observable<Blob> {
    return this.http.post(`${this.env}export`, { type }, {
      responseType: 'blob'
    });
  }
}
