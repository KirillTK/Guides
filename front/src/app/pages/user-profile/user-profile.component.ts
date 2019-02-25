import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/User.service';
import {InstructionService} from '../../shared/services/Instruction.service';
import {forkJoin} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../shared/model/Instruction';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public instructions: Instruction[];
  public userEmail: string;
  public isLoaded = false;

  constructor(private user: UserService, private instruction: InstructionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const uid: string = this.route.snapshot.paramMap.get('id');
    const userInfo = this.user.getUserById(uid);
    const instructions = this.instruction.getUserInstructions(uid);
    forkJoin(userInfo, instructions).subscribe(result => {
      this.userEmail = result[0];
      this.instructions = result[1];
      console.log(this.instructions);
      this.isLoaded = true;
    });
  }

}
