import {Component, OnInit} from '@angular/core';
import {InstructionService} from '../../shared/services/Instruction.service';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../shared/model/Instruction';

@Component({
  selector: 'app-instructions-by-tag-page',
  templateUrl: './instructions-by-tag-page.component.html',
  styleUrls: ['./instructions-by-tag-page.component.scss']
})
export class InstructionsByTagPageComponent implements OnInit {

  page = 0;
  tag: string;
  instructionCollection: Instruction[];

  constructor(private instructions: InstructionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag');
    console.log(this.tag);
    this.instructions.getInstructionsByTag(this.tag, this.page)
      .subscribe((instructions: Instruction[]) => this.instructionCollection = instructions);
  }

  loadMore(): void {
    this.page += 8;
    this.instructions.getInstructionsByTag(this.tag, this.page)
      .subscribe((instructions: Instruction[]) => this.instructionCollection = this.instructionCollection.concat(instructions));
  }

}
