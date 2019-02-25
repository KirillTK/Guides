import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../../../shared/model/User';
import {AdminService} from '../../../../shared/services/Admin.service';


export interface User {
  name: string;
  lastLogin: string;
  isDisable: boolean;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['email', 'isActivate', 'isAdmin', 'action'];
  dataSource;
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoaded = false;

  constructor(private admin: AdminService) {
  }

  ngOnInit() {
    this.admin.getListUsers().subscribe((users: User[]) => {
      console.log(users);
      this.initTable(users);
    });
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

  // block() {
  //   this.selection.selected.forEach((user: any) => {
  //
  //   });
  //   this.selection.clear();
  // }

  // deleteUser() {
  //   this.selection.selected.forEach((user: any) => {
  //
  //   });
  //   this.selection.clear();
  // }

  action(element) {
    console.log(element);
  }

  blockUser(user: User): void {
    user.isActivate = !user.isActivate;
    this.admin.blockUser(user).subscribe((users: User[]) => {
      this.initTable(users);
    });
    console.log('block', user);
  }

  deleteUser(user: User): void {
    console.log('delete', user);
    this.admin.deleteUser(user._id).subscribe((users: User[]) => {
      this.initTable(users);
    });
  }

  changeRole(user: User): void {
    console.log('set admin', user);
    user.isAdmin = !user.isAdmin;
    this.admin.changeRole(user).subscribe((users: User[]) => {
      this.initTable(users);
    });
  }

  private initTable(users: User[]) {
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoaded = true;
  }
}
