import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Instruction} from '../../../../shared/model/Instruction';
import {Theme} from '../../../../shared/model/Theme';
import {Tag} from '../../../../shared/model/Tag';
import {InstructionService} from '../../../../shared/services/Instruction.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  @Input() instruction: Instruction;
  @Input() themes: Theme[];
  @Input() tags: Tag[];
  public instructionForm: FormGroup;
  public steps: FormArray;

  constructor(private formBuilder: FormBuilder, private instructionService: InstructionService) {
  }


  ngOnInit(): void {
    this.instructionForm = this.formBuilder.group({
      imageInstruction: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      theme: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      steps: this.formBuilder.array([this.createStepFormControl()])
    });

    this.steps = this.instructionForm.get('steps') as FormArray;
    this.instructionForm.patchValue(this.instruction);
    this.instructionForm.controls.imageInstruction.setValue(this.instruction.imgHref);
    this.initFormArray();
  }

  private initFormArray() {
    const {steps} = this.instruction;
    for (let i = 1; i < steps.length; i++) {
      console.log(steps[i].stepTitle, steps[i].descriptionTitle);
      this.steps.push(this.formBuilder.group({
        stepTitle: [steps[i].stepTitle, Validators.compose([Validators.required, Validators.minLength(3)])],
        descriptionTitle: [steps[i].descriptionTitle, Validators.compose([Validators.required, Validators.minLength(5)])]
      }));
    }
  }


  addStep(): void {
    this.steps.push(this.createStepFormControl());
  }

  deleteStep(): void {
    if (this.steps.length !== 1) {
      this.steps.removeAt(this.steps.length - 1);
    }
  }

  updateInstruction(): void {
    this.instructionService.updateInstruction(this.instruction._id, this.instructionForm.value).subscribe();
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
      this.instructionForm.get(key).disable();
    });
  }

  enableForm() {
    Object.keys(this.instructionForm.controls).forEach((key) => {
      this.instructionForm.get(key).enable();
    });
  }

  loadDataToForm(): void {
  }


}
