import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Instruction} from '../../shared/model/Instruction';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {AuthService} from '../../shared/services/AuthService';
import {Comment} from '../../shared/model/Comment';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent implements OnInit {

  public instruction: Instruction;
  public isLoaded = false;
  public reviewForm: FormGroup;
  score: number;
  isHidden: boolean;
  private idInstruction: string;
  public comments: Comment[];

  constructor(private route: ActivatedRoute,
              private instructionService: InstructionService,
              private user: UserService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {

    this.reviewForm = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      score: new FormControl(null, [Validators.required])
    });

    this.idInstruction = this.route.snapshot.paramMap.get('id');

    const instructions = this.instructionService.getInstructionById(this.idInstruction);
    const comments = this.instructionService.getCommentsByIdInstruction(this.idInstruction);
    forkJoin([instructions, comments]).subscribe(results => {
      this.instruction = results[0];
      this.comments = results[1];
      console.log(this.comments);
      this.isHidden = this.checkInstruction();
      this.isLoaded = true;
    });
  }


  publishReview() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    const {comment, score} = this.reviewForm.value;
    this.instructionService.postComment({
      comment,
      score,
      instructionID: this.idInstruction,
      userName: this.user.user.email,
      userID: this.user.user._id
    }).subscribe(() => this.resetForm());
    console.log(this.reviewForm.value);
  }


  public checkInstruction(): boolean {
    if (this.checkIfIsYourInstruction()) {
      return true;
    } else {
      return this.isAlreadyPostComment();
    }
  }

  private checkIfIsYourInstruction(): boolean {
    if (this.user.user) {
      return this.instruction.idUser === this.user.user._id;
    }
    return false;
  }

  private isAlreadyPostComment() {
    if (this.user.user) {
      const comments = this.comments.find((comment) => comment.userID === this.user.user._id);
      return comments !== undefined;
    }
    return false;
  }


  private resetForm(): void {
    this.reviewForm.reset();
    Object.keys(this.reviewForm.controls).forEach(control => {
      this.reviewForm.controls[control].setErrors(null);
    });
    this.isHidden = true;
  }

}
