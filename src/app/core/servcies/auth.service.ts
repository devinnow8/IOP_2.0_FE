import { Injectable } from '@angular/core';
import { API } from '../api';
import { HttpRequestService } from './http-request.service';
import { SignIn, SignUp } from '../interfaces/user';


@Injectable()
export class AuthService {

  constructor(private http: HttpRequestService) { }

  signIn(data: SignIn) {
    return this.http.post(API.user.signIn, data);
  }

  signUp(data: SignUp) {
    return this.http.post(API.user.signUp, data);
  }

}