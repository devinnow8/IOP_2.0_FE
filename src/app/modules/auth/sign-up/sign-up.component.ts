import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@app/core/servcies/auth.service';
import { Router} from '@angular/router';
import { UserService } from '@app/core/servcies/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      phone_number: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  signUp() {
    const formData = this.signUpForm?.value;
    console.log("formData", formData)
    this.authService.signUp(formData).subscribe({next: (res) => {
      this.userService.storeUser(res);
      this.router.navigate(['/dashboard'], {replaceUrl:true});
    }})
    
  }
}
