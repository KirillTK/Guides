import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InstructionService} from '../../../../shared/services/Instruction.service';
import {ActivatedRoute} from '@angular/router';
import {Instruction} from '../../../../shared/model/Instruction';
import {Theme} from '../../../../shared/model/Theme';
import {Tag} from '../../../../shared/model/Tag';

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
export class ListInstructionComponent implements OnInit {

  public isLoaded = false;
  @Input() themes: Theme[];
  @Input() tags: Tag[];

  dataSource: MatTableDataSource<Instruction>;
  columnsToDisplay = ['name', 'theme', 'score', 'activity'];
  expandedElement: Instruction | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private instructionService: InstructionService, private route: ActivatedRoute) {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteInstruction(event: Event, instruction: Instruction) {
    this.instructionService.deleteInstruction(instruction._id).subscribe((instructions: Instruction[]) => {
      console.log('here', instructions);
      this.initTable(instructions);
    });
    event.stopPropagation();
  }

  goToInstruction(event: Event, instruction: Instruction) {

    event.stopPropagation();
  }


  private initTable(instructions: Instruction[]) {
    this.dataSource = new MatTableDataSource(instructions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoaded = true;
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.instructionService.getUserInstructions(id).subscribe((instructions: Instruction[]) => {
      this.initTable(instructions);
    });

    this.instructionService.userInstructions.subscribe((instructions: Instruction[]) => {
      this.initTable(instructions);
    });
  }
}
