import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AjaxResponse} from 'rxjs/ajax';
import {Instruction} from '../../shared/model/Instruction';
import {InstructionService} from '../../shared/services/Instruction.service';

@Component({
  selector: 'app-root',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPageComponent implements OnInit {
  public rate = 3.34;
  public tag;
  options: Instruction[];
  public items = [1, 2, 3, 4];

  @ViewChild('searchBox') searchBox: ElementRef;


  constructor(private instruction: InstructionService) {
  }

  ngOnInit(): void {

    const typeahead = this.instruction.getSearchObserver(this.searchBox);

    typeahead.subscribe((response: AjaxResponse) => {
      this.options = response.response;
    });
  }


}
