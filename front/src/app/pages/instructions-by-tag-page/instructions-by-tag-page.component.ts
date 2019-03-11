import {Component, OnDestroy, OnInit} from '@angular/core';
import {InstructionService} from '../../shared/services/Instruction.service';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../shared/model/Instruction';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-instructions-by-tag-page',
  templateUrl: './instructions-by-tag-page.component.html',
  styleUrls: ['./instructions-by-tag-page.component.scss']
})
export class InstructionsByTagPageComponent implements OnInit, OnDestroy {

  page = 0;
  tag: string;
  instructionCollection: Instruction[];

  private loadMoreSubscription: Subscription;
  private instructionSubscription: Subscription;

  constructor(private instructions: InstructionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.instructionSubscription = this.instructions.getInstructionsByTag(this.tag, this.page)
      .subscribe((instructions: Instruction[]) => this.instructionCollection = instructions);
  }

  loadMore(): void {
    this.page += 8;
    this.loadMoreSubscription = this.instructions.getInstructionsByTag(this.tag, this.page)
      .subscribe((instructions: Instruction[]) => this.instructionCollection = this.instructionCollection.concat(instructions));
  }

  ngOnDestroy(): void {
    if (this.loadMoreSubscription) {this.loadMoreSubscription.unsubscribe(); }
    if (this.instructionSubscription) {this.instructionSubscription.unsubscribe(); }
  }

}
