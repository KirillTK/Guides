import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {User} from '../../shared/model/User';
import {Router} from '@angular/router';
import {LoginResponse} from '../../shared/model/LoginResponse';
import {AuthService} from '../../shared/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoginFail = false;
  public failMessage: string;

  constructor(private userService: UserService, private route: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submitLogin(): void {
    const registrationUser: User = this.loginForm.value;
    this.userService.loginUser(registrationUser).subscribe((response: LoginResponse) => {


      if (response.success) {
        this.auth.setLoggedIn(true);
        this.route.navigate(['/']);
      } else {
        this.showUserAlert(response.message);
      }
    });
    this.resetForm();
  }

  private showUserAlert(message: string): void {
    this.isLoginFail = true;
    this.failMessage = message;
    setTimeout(() => this.isLoginFail = false, 3000);
  }

  private resetForm(): void {
    this.loginForm.reset();

    Object.keys(this.loginForm.controls).forEach(control => {
      this.loginForm.controls[control].setErrors(null);
    });
  }

}
