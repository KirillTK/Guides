import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Instruction} from '../../shared/model/Instruction';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {AuthService} from '../../shared/services/AuthService';
import {Comment} from '../../shared/model/Comment';
import {forkJoin} from 'rxjs';
import {FileService} from '../../shared/services/File.service';
import {saveAs} from 'file-saver';
import * as socketIo from 'socket.io-client';
import {MatSnackBar} from '@angular/material';

export interface WebsocketResponse {
  comments: Comment[];
  instruction: Instruction;
}

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
  @ViewChild('pdfData') pdfData: ElementRef;
  socket = socketIo('http://localhost:3000');

  constructor(private route: ActivatedRoute,
              private instructionService: InstructionService,
              private user: UserService,
              private auth: AuthService,
              private router: Router,
              private file: FileService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {


    this.socket.on('reviews', (response: WebsocketResponse) => {
      console.log(response.comments, response.instruction);
      this.comments = response.comments;
      this.instruction = response.instruction;
    });

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
    }).subscribe(() => {
      this.socket.emit('postReview', this.idInstruction);
      this.snackBar.open('Published!', '', {duration: 2000});
      this.resetForm();
    });
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

  savePDF() {
    this.file.getPDF(this.idInstruction).subscribe(data => {
      const blob = new Blob([data], {type: 'application/pdf'});
      saveAs(blob, `${this.instruction.name}.pdf`);
    });
  }

}
