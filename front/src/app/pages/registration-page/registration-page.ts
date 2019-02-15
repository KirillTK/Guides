import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {User} from '../../shared/model/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.css']
})
export class RegistrationPageComponent implements OnInit {

  public registrationForm: FormGroup;
  public isAlreadyBeenRegistered = false;

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
    this.userService.registerUser(user).subscribe((isAlreadyBeenRegistered: boolean) => {
      if (isAlreadyBeenRegistered) {
        console.log(isAlreadyBeenRegistered);
        this.showUserAlert();
      }
    });
    this.resetForm();
  }

  private showUserAlert(): void {
    this.isAlreadyBeenRegistered = true;
    setTimeout(() => this.isAlreadyBeenRegistered = false, 3000);
  }

  private resetForm(): void {
    this.registrationForm.reset();

    Object.keys(this.registrationForm.controls).forEach(control => {
      this.registrationForm.controls[control].setErrors(null);
    });
  }

}
