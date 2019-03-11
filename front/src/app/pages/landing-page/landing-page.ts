import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AjaxResponse} from 'rxjs/ajax';
import {Instruction} from '../../shared/model/Instruction';
import {InstructionService} from '../../shared/services/Instruction.service';
import {forkJoin, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  options: Instruction[];
  topInstructions: Instruction[];
  latestInstructions: Instruction[];
  private typeahead: Observable<AjaxResponse>;

  private instructionsSubscription: Subscription;
  private typeHeadSubscription: Subscription;

  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private instruction: InstructionService) {
  }

  ngOnInit(): void {

    const topInstructions = this.instruction.getTopRatedInstructions();
    const latestInstructions = this.instruction.getLatestInstructions();

    this.typeahead = this.instruction.getSearchObserver(this.searchBox);

    this.instructionsSubscription = forkJoin([topInstructions, latestInstructions])
      .subscribe(results => {
        this.topInstructions = results[0];
        this.latestInstructions = results[1];
      });

    this.typeHeadSubscription = this.typeahead
      .subscribe((response: AjaxResponse) => {
        this.options = response.response;
      });
  }

  ngOnDestroy(): void {
    if (this.typeHeadSubscription) {this.typeHeadSubscription.unsubscribe(); }
    if (this.instructionsSubscription) {this.instructionsSubscription.unsubscribe(); }
  }

}
