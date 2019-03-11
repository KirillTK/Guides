import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/User.service';
import {UserProfile} from '../../../pages/user-profile/user-profile.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() uid: string;
  profile: UserProfile;
  isNotFounded: boolean;
  isLoaded: boolean;


  constructor(private user: UserService) {
  }

  ngOnInit() {
    this.user.getUserById(this.uid).subscribe((profile: UserProfile) => {
      if (profile) {
        this.profile = profile;
      } else {
        this.isNotFounded = true;
      }
      this.isLoaded = true;
    });
  }

}
