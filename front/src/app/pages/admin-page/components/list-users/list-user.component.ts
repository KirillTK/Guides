import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


export interface User {
  name: string;
  lastLogin: string;
  isDisable: boolean;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  // displayedColumns: string[] = ['select', 'name', 'lastLogin', 'isDisable', 'action'];
  displayedColumns: string[] = ['name', 'lastLogin', 'isDisable', 'action'];
  dataSource;
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>([{
      name: 'kirill',
      lastLogin: '0.2.1090',
      isDisable: false
    }, {name: 'artur', lastLogin: '2.10.2090', isDisable: true}]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  block() {
    this.selection.selected.forEach((user: any) => {

    });
    this.selection.clear();
  }

  deleteUser() {
    this.selection.selected.forEach((user: any) => {

    });
    this.selection.clear();
  }

  action(element) {
    console.log(element);
  }
}
