import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Instruction} from '../../shared/model/Instruction';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/User.service';
import {AuthService} from '../../shared/services/AuthService';
import {Comment} from '../../shared/model/Comment';
import {forkJoin, Subscription} from 'rxjs';
import {FileService} from '../../shared/services/File.service';
import {saveAs} from 'file-saver';
import * as socketIo from 'socket.io-client';
import {MatSnackBar} from '@angular/material';
import {CommentService} from '../../shared/services/comment.service';

export interface WebsocketResponse {
  comments: Comment[];
  instruction: Instruction;
}

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent implements OnInit, OnDestroy {

  public instruction: Instruction;
  public isLoaded = false;
  public reviewForm: FormGroup;
  score: number;
  isHidden: boolean;
  private idInstruction: string;
  public comments: Comment[];
  @ViewChild('pdfData') pdfData: ElementRef;
  socket = socketIo('http://localhost:3000');

  private instructionInfoSubscription: Subscription;
  private postReviewSubscription: Subscription;
  private savePDFSubscription: Subscription;
  private likeSubscription: Subscription;


  constructor(private route: ActivatedRoute,
              private instructionService: InstructionService,
              private user: UserService,
              private auth: AuthService,
              private router: Router,
              private file: FileService,
              private snackBar: MatSnackBar,
              private comment: CommentService) {
  }

  ngOnInit() {


    this.socket.on('reviews', (response: WebsocketResponse) => {
      this.comments = response.comments;
      this.instruction = response.instruction;
    });

    this.socket.on('comments', (response: Comment[]) => {
      this.comments = response;
    });

    this.reviewForm = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      score: new FormControl(null, [Validators.required])
    });

    this.idInstruction = this.route.snapshot.paramMap.get('id');

    const instructions = this.instructionService.getInstructionById(this.idInstruction);
    const comments = this.instructionService.getCommentsByIdInstruction(this.idInstruction);
    this.instructionInfoSubscription = forkJoin([instructions, comments])
      .subscribe(results => {
        this.instruction = results[0];
        this.comments = results[1];
        this.isHidden = this.checkInstruction();
        this.isLoaded = true;
      });
  }


  publishReview() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    const {comment, score} = this.reviewForm.value;
    this.postReviewSubscription = this.instructionService.postComment({
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
    this.savePDFSubscription = this.file.getPDF(this.idInstruction)
      .subscribe(data => {
        const blob = new Blob([data], {type: 'application/pdf'});
        saveAs(blob, `${this.instruction.name}.pdf`);
      });
  }

  likeComment(commentID: string) {
    this.likeSubscription = this.comment.likeComment(commentID, this.idInstruction)
      .subscribe(() => this.socket.emit('likeComment', this.idInstruction));
  }

  ngOnDestroy(): void {
    if (this.instructionInfoSubscription) {this.instructionInfoSubscription.unsubscribe(); }
    if (this.postReviewSubscription) {this.postReviewSubscription.unsubscribe(); }
    if (this.savePDFSubscription) {this.savePDFSubscription.unsubscribe(); }
    if (this.likeSubscription) {this.likeSubscription.unsubscribe(); }
  }

}
