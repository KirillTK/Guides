import {Component, Input, OnInit} from '@angular/core';
import {Instruction} from '../../model/Instruction';

@Component({
  selector: 'app-card-instructions',
  templateUrl: './card-instructions.component.html',
  styleUrls: ['./card-instructions.component.scss']
})
export class CardInstructionsComponent implements OnInit {


  @Input() instructions: Instruction[];
  @Input() isNeedDateField: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
