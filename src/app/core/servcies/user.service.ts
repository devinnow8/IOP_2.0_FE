import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';

interface UserResponse extends User {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false;

  constructor(private localStorage: LocalStorageService) {
    this.isLoggedIn = !!this.getToken;
  }

  storeUser(user: any) {
    const { jwt, ...userData } = user as UserResponse;
    this.localStorage.set('nis_user', userData, true);
    this.localStorage.set('nis_token', jwt);
    this.isLoggedIn = true;
  }

  get getUser(): User {
    return this.localStorage.get('nis_user', true);
  }

  get getToken() {
    return this.localStorage.get('nis_token');
  }

  removeUser() {
    this.localStorage.remove('nis_user');
    this.localStorage.remove('nis_token');
    this.isLoggedIn = false;
  }

}