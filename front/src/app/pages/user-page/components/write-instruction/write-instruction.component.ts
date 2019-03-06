import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InstructionService} from '../../../../shared/services/Instruction.service';
import {UserService} from '../../../../shared/services/User.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {Theme} from '../../../../shared/model/Theme';
import {Tag} from '../../../../shared/model/Tag';
import * as socketIo from 'socket.io-client';
import {MatSnackBar} from '@angular/material';
import {Comment} from '../../../../shared/model/Comment';

@Component({
  selector: 'app-write-instruction',
  templateUrl: './write-instruction.component.html',
  styleUrls: ['./write-instruction.component.scss']
})
export class WriteInstructionComponent implements OnInit {

  public instructionForm: FormGroup;
  public steps: FormArray;
  @Input() themes: Theme[];
  @Input() tags: Tag[];

  // socket = socketIo('http://localhost:3000');


  constructor(private formBuilder: FormBuilder,
              private instructionService: InstructionService,
              private user: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {

    // this.socket.on('newInstruction', (data) => {
    //   console.log(data);
    // });
    //
    // this.socket.emit('addInstruction', {});

    this.instructionForm = this.formBuilder.group({
      imageInstruction: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      theme: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      steps: this.formBuilder.array([this.createStepFormControl()])
    });
    this.steps = this.instructionForm.get('steps') as FormArray;
    console.log(this.user.user);
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = Math.random().toString(36).substring(2);
    const task = this.storage.upload(filePath, file).then(() => {
      const ref = this.storage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        console.log(url);
      });
    });
  }

  addStep(): void {
    this.steps.push(this.createStepFormControl());
  }

  deleteStep(): void {
    if (this.steps.length !== 1) {
      this.steps.removeAt(this.steps.length - 1);
    }
  }

  postInstruction(): void {
    const {imageInstruction} = this.instructionForm.value;
    const idUser = this.route.snapshot.paramMap.get('id');
    const {description, theme, tags, steps, title} = this.instructionForm.value;
    this.resetForm();
    console.log(description, theme, tags, steps, title);
    this.showPostedAlert();
    const file = imageInstruction[0].file;
    const filePath = Math.random().toString(36).substring(2);
    const task = this.storage.upload(filePath, file).then(() => {
      const ref = this.storage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe((imageUrl: string) => {

        this.instructionService.postInstruction({
          name: title,
          theme,
          tags,
          steps,
          imgHref: imageUrl,
          idUser,
          description,
          author: this.user.user.email
        }).subscribe(() => this.instructionService.getUserFreshInstructions(idUser));
      });
    });
  }

  createStepFormControl(): FormGroup {
    return this.formBuilder.group({
      stepTitle: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descriptionTitle: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  private resetForm(): void {
    this.instructionForm.reset();
    Object.keys(this.instructionForm.controls).forEach(control => {
      this.instructionForm.controls[control].setErrors(null);
    });
    this.clearSteps();
  }

  private clearSteps(): void {
    Object.keys(this.steps.controls).forEach(control => {
      console.log(this.steps.controls[control]);
      this.steps.controls[control].setErrors(null);

      Object.keys(this.steps.controls[control].controls).forEach(index => {
        console.log(this.steps.controls[control].controls[index]);
        this.steps.controls[control].controls[index].setErrors(null);
      });
    });
    this.deleteSteps();
  }


  private deleteSteps(): void {
    while (this.steps.length !== 1) {
      this.deleteStep();
    }
  }

  private showPostedAlert(): void {
    this.snackBar.open('Posted!', '', {duration: 2000});
  }

}
