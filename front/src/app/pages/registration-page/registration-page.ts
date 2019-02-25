import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {User} from '../../shared/model/User';
import {RegistrationResponse} from '../../shared/model/RegistrationResponse';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.scss']
})
export class RegistrationPageComponent implements OnInit {

  public registrationForm: FormGroup;
  public registrationMessage: RegistrationResponse;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submitRegistration(): void {
    console.log('here', this.registrationForm.value);
    const user: User = this.registrationForm.value;
    this.userService.registerUser(user).subscribe((response: RegistrationResponse) => {
      this.showUserAlert(response);
    });
    this.resetForm();
  }

  private showUserAlert(response: RegistrationResponse): void {
    this.registrationMessage = response;
    setTimeout(() => this.registrationMessage = null, 3000);
  }

  private resetForm(): void {
    this.registrationForm.reset();

    Object.keys(this.registrationForm.controls).forEach(control => {
      this.registrationForm.controls[control].setErrors(null);
    });
  }

}
