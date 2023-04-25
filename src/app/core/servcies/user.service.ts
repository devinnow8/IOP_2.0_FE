import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false;

  constructor(private localStorage: LocalStorageService) { }


  storeUser(token: string) {
    this.localStorage.set('token', token);
    this.isLoggedIn = true;
  }

}