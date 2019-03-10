import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/User.service';
import {InstructionService} from '../../shared/services/Instruction.service';
import {forkJoin} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../shared/model/Instruction';

export interface UserProfile {
  email: string;
  date: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public instructions: Instruction[];
  public userProfile: UserProfile;
  public isLoaded = false;
  public isNotFounded: boolean;
  public uid: string;

  constructor(private user: UserService, private instruction: InstructionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');
    const userInfo = this.user.getUserById(this.uid);
    const instructions = this.instruction.getUserInstructions(this.uid);
    forkJoin(userInfo, instructions).subscribe(result => {
      if (result[0]) {
        this.userProfile = result[0];
        this.instructions = result[1];
      } else {
        this.isNotFounded = true;
      }
      this.isLoaded = true;

    });
  }

}
