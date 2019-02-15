import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {User} from '../../shared/model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoginFail = false;

  constructor(private userService: UserService, private route: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submitLogin(): void {
    const registrationUser: User = this.loginForm.value;
    this.userService.loginUser(registrationUser).subscribe((user: User) => {

      if (user) {
        this.route.navigate(['/user', user._id]);
        this.userService.user = user;
      } else {
        this.showUserAlert();
      }

    });
    this.resetForm();
  }

  private showUserAlert(): void {
    this.isLoginFail = true;
    setTimeout(() => this.isLoginFail = false, 3000);
  }

  private resetForm(): void {
    this.loginForm.reset();

    Object.keys(this.loginForm.controls).forEach(control => {
      this.loginForm.controls[control].setErrors(null);
    });
  }

}
