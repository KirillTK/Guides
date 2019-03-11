import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InstructionService} from '../../../../shared/services/Instruction.service';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../../../shared/model/Instruction';
import {Theme} from '../../../../shared/model/Theme';
import {Tag} from '../../../../shared/model/Tag';
import {SettingsService} from '../../../../shared/services/Settings.service';
import * as socketIo from 'socket.io-client';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-list-instruction',
  styleUrls: ['./list-instruction.component.scss'],
  templateUrl: './list-instruction.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class ListInstructionComponent implements OnInit, OnDestroy {

  public isLoaded = false;
  @Input() themes: Theme[];
  @Input() tags: Tag[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  socket = socketIo('http://localhost:3000');
  dataSource: MatTableDataSource<Instruction>;
  columnsToDisplay = ['name', 'theme', 'score', 'activity'];
  expandedElement: Instruction | null;

  private instructionsSubscription: Subscription;
  private changeInstructionSubscription: Subscription;

  constructor(private instructionService: InstructionService, private route: ActivatedRoute, private settings: SettingsService) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteInstruction(event: Event, instruction: Instruction) {
    this.instructionService.deleteInstruction(instruction._id).subscribe((instructions: Instruction[]) => {
      this.initTable(instructions);
    });
    event.stopPropagation();
  }


  private initTable(instructions: Instruction[]) {
    this.dataSource = new MatTableDataSource(instructions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = this.settings.getTranslationForPaginator();
    const id: string = this.route.snapshot.paramMap.get('id');
    this.instructionsSubscription = this.instructionService
      .getUserInstructions(id)
      .subscribe((instructions: Instruction[]) => {
        this.initTable(instructions);
      });

    this.changeInstructionSubscription = this.instructionService.userInstructions
      .subscribe((instructions: Instruction[]) => {
        this.initTable(instructions);
      });

    this.socket.on('userInstructions', (response: Instruction[]) => {
      this.initTable(response);
    });
  }

  ngOnDestroy(): void {
    if (this.instructionsSubscription) { this.instructionsSubscription.unsubscribe(); }
    if (this.changeInstructionSubscription) { this.changeInstructionSubscription.unsubscribe(); }
  }
}
