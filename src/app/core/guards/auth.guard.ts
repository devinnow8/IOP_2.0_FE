import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servcies/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private user: UserService, private router: Router) { }

  canLoad(): boolean {
    if (!this.user.isLoggedIn) {
      this.router.navigate(['/sessions/sign-in']);
      return false;
    }
    return true;
  }
}