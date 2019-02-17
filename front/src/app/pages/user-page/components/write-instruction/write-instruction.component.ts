import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InstructionService} from '../../../../shared/services/Instruction.service';
import {UserService} from '../../../../shared/services/User.service';

@Component({
  selector: 'app-write-instruction',
  templateUrl: './write-instruction.component.html',
  styleUrls: ['./write-instruction.component.css']
})
export class WriteInstructionComponent implements OnInit {

  public files: UploadFile[] = [];
  public url;
  public instructionForm: FormGroup;
  public steps: FormArray;


  constructor(private formBuilder: FormBuilder, private instructionService: InstructionService, private user: UserService) {
  }


  ngOnInit(): void {
    this.instructionForm = this.formBuilder.group({
      imageInstruction: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      theme: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      steps: this.formBuilder.array([this.createStepFormControl()])
      // stepTitle: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      // descriptionTitle: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
    this.steps = this.instructionForm.get('steps') as FormArray;
    console.log('here', this.instructionForm);
  }


  // public dropped(event: UploadEvent) {
  //   this.files = event.files;
  //   for (const droppedFile of event.files) {
  //
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = (ev) => {
  //           this.url = ev.target.result;
  //         };
  //
  //         console.log(droppedFile.relativePath, file);
  //
  //       });
  //     } else {
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  addStep(): void {
    this.steps.push(this.createStepFormControl());
  }

  deleteStep(): void {
    if (this.steps.length !== 1) {
      this.steps.removeAt(this.steps.length - 1);
      console.log(this.instructionForm);
    }
  }

  postInstruction(): void {
    this.instructionService.postInstruction(this.user.user._id, this.instructionForm.value).subscribe(data => console.log(data));
  }

  createStepFormControl(): FormGroup {
    return this.formBuilder.group({
      stepTitle: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descriptionTitle: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

}
