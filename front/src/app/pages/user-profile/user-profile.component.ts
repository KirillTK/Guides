import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/User.service';
import {InstructionService} from '../../shared/services/Instruction.service';
import {forkJoin, Subscription} from 'rxjs';
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
export class UserProfileComponent implements OnInit, OnDestroy {

  instructions: Instruction[];
  userProfile: UserProfile;
  isLoaded = false;
  isNotFounded: boolean;
  uid: string;

  private userSubscription: Subscription;

  constructor(private user: UserService, private instruction: InstructionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');
    const userInfo = this.user.getUserById(this.uid);
    const instructions = this.instruction.getUserInstructions(this.uid);
    this.userSubscription = forkJoin(userInfo, instructions).subscribe(result => {
      if (result[0]) {
        this.userProfile = result[0];
        this.instructions = result[1];
      } else {
        this.isNotFounded = true;
      }
      this.isLoaded = true;

    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
