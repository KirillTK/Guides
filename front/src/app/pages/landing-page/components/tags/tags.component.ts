import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../../../shared/model/Tag';
import {InstructionService} from '../../../../shared/services/Instruction.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Observable<Tag[]>;

  constructor(private instructions: InstructionService) {
  }

  ngOnInit() {
    this.tags = this.instructions.getTags();
  }

}
