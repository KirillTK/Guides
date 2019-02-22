import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Instruction} from '../../shared/model/Instruction';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css']
})
export class InstructionPageComponent implements OnInit {

  public instruction: Instruction;
  public isLoaded = false;

  constructor(private route: ActivatedRoute, private instructionService: InstructionService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.instructionService.getInstructionById(id).subscribe((instruction: Instruction) => {
      this.instruction = instruction;
      this.isLoaded = true;
    });
    // this.instructionService.getInstructionById(id).subscribe((instruction: Instruction) => console.log(instruction));
  }

}
