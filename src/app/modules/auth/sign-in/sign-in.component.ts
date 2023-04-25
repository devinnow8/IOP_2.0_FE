import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@app/core/servcies/auth.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  signInForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.initForm();
  }


  initForm() {
    this.signInForm = new FormGroup({
      username_email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  login(event: any) {
    const formData = this.signInForm?.value;
    this.authService.signIn(formData).subscribe({next: (res) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/dashboard'], {replaceUrl:true});
    }})
    
  }
}
