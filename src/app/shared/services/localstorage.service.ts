import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  setJsonItem(key: string, value: unknown): void {
    this.setItem(key, JSON.stringify(value));
  }

  getJsonItem<T>(key: string): T | null {
    const item = this.getItem(key);
    if (!item) return null;

    return JSON.parse(item) as T;
  }
}
