import {Component, OnInit} from '@angular/core';
import {UploadFile} from 'ngx-file-drop';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  public instructionForm: FormGroup;
  public steps: FormArray;
  public isEdit = false;


  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.instructionForm = this.formBuilder.group({
      imageInstruction: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      theme: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      steps: this.formBuilder.array([this.createStepFormControl()])
    });
    this.steps = this.instructionForm.get('steps') as FormArray;
    this.disableForm();
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
    console.log(this.instructionForm);
  }

  createStepFormControl(): FormGroup {
    return this.formBuilder.group({
      stepTitle: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descriptionTitle: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  disableForm() {
    this.instructionForm.reset();
    Object.keys(this.instructionForm.controls).forEach((key) => {
      this.isEdit = false;
      this.instructionForm.get(key).disable();
    });
  }

  enableForm() {
    Object.keys(this.instructionForm.controls).forEach((key) => {
      this.isEdit = true;
      this.instructionForm.get(key).enable();
    });
  }

}
