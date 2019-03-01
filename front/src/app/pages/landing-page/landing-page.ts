import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AjaxResponse} from 'rxjs/ajax';
import {Instruction} from '../../shared/model/Instruction';
import {InstructionService} from '../../shared/services/Instruction.service';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPageComponent implements OnInit {

  options: Instruction[];
  public topInstructions: Instruction[];
  public latestInstructions: Instruction[];

  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private instruction: InstructionService) {
  }

  ngOnInit(): void {

    const topInstructions = this.instruction.getTopRatedInstructions();
    const latestInstructions = this.instruction.getLatestInstructions();

    const typeahead = this.instruction.getSearchObserver(this.searchBox);

    forkJoin([topInstructions, latestInstructions]).subscribe(results => {
      this.topInstructions = results[0];
      this.latestInstructions = results[1];
    });

    typeahead.subscribe((response: AjaxResponse) => {
      this.options = response.response;
    });
  }


}
