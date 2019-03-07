import {Component, OnInit} from '@angular/core';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Theme} from '../../shared/model/Theme';
import {Tag} from '../../shared/model/Tag';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss']
})
export class UserPageComponent implements OnInit {

  public themes: Theme[];
  public tags: Tag[];
  public isLoaded: boolean;

  constructor(private instruction: InstructionService, private route: Router) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const theme = this.instruction.getThemeInstruction();
    const tags = this.instruction.getTags();
    forkJoin([theme, tags]).subscribe(results => {
      this.themes = results[0];
      this.tags = results[1];
      this.isLoaded = true;
    });
  }
}
