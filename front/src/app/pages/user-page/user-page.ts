import {Component, OnInit} from '@angular/core';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Theme} from '../../shared/model/Theme';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.css']
})
export class UserPageComponent implements OnInit {

  public themes: Theme[];

  constructor(private instruction: InstructionService) {
  }

  ngOnInit(): void {
    // this.instruction.getThemeInstruction().subscribe((themes: Theme[]) => {
    //   this.themes = themes;
    // });
  }
}
