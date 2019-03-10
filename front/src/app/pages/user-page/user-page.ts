import {Component, OnDestroy, OnInit} from '@angular/core';
import {InstructionService} from '../../shared/services/Instruction.service';
import {Theme} from '../../shared/model/Theme';
import {Tag} from '../../shared/model/Tag';
import {forkJoin, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  themes: Theme[];
  tags: Tag[];
  isLoaded: boolean;
  uid: string;

  private infoSubscription: Subscription;

  constructor(private instruction: InstructionService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    const theme = this.instruction.getThemeInstruction();
    const tags = this.instruction.getTags();
    this.infoSubscription = forkJoin([theme, tags]).subscribe(results => {
      this.themes = results[0];
      this.tags = results[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.infoSubscription) {
      this.infoSubscription.unsubscribe();
    }
  }
}
