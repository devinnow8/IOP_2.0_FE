import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: any, json?: boolean) {
    localStorage.setItem(key, json ? JSON.stringify(value) : value);
  }

  get(key: string, json?: boolean) {
    let value: any = window.localStorage.getItem(key);
    try {
      return json ? JSON.parse(value) : value;
    } catch (e) {
      return null
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}