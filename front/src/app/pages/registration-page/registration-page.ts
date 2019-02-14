import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.css']
})
export class RegistrationPageComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submitRegistration() {
    console.log('here', this.registrationForm.value);
    this.userService.registerUser(this.registrationForm.value).subscribe(data => console.log(data));
  }

}
