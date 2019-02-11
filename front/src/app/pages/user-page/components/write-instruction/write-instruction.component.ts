import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-write-instruction',
  templateUrl: './write-instruction.component.html',
  styleUrls: ['./write-instruction.component.css']
})
export class WriteInstructionComponent implements OnInit {

  public files: UploadFile[] = [];
  public url;
  public steps = [1];
  public instructionForm: FormGroup;


  ngOnInit(): void {
    this.instructionForm = new FormGroup({
      imageInstruction: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      theme: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      stepTitle: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descriptionTitle: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
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
    this.steps.push(1);
  }

  deleteStep(): void {
    this.steps = this.steps.slice(0, this.steps.length - 1);
  }

  postInstruction(): void {
    console.log(this.instructionForm);
  }

}
