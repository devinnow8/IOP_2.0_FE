import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/core/servcies/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  overlayVisible: boolean = false;
  userName: string = '';

  constructor(
    private user: UserService,
    private router: Router
    ) {

    this.userName = this.user.getUser.name;
  }

  toggle() {
      this.overlayVisible = !this.overlayVisible;
  }

  logout() {
    this.user.removeUser();
    this.router.navigate(['/session/sign-in'])
  }

}
