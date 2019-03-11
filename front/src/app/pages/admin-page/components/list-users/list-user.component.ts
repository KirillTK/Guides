import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../../../shared/model/User';
import {AdminService} from '../../../../shared/services/Admin.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../../shared/services/Settings.service';
import {UserService} from '../../../../shared/services/User.service';
import {AuthService} from '../../../../shared/services/AuthService';


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

  displayedColumns: string[] = ['position', 'email', 'isActivate', 'isAdmin'];
  dataSource;
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoaded = false;

  constructor(private admin: AdminService,
              private route: Router,
              private settings: SettingsService,
              private user: UserService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = this.settings.getTranslationForPaginator();
    this.admin.getListUsers().subscribe((users: User[]) => {
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

  blockUser(): void {
    this.selection.selected.forEach((user: User) => {
      user.isActivate = false;

      this.admin.blockUser(user).subscribe((users: User[]) => {
        this.initTable(users);
      });

      if (this.isSelectedUserInSystem(user)) {
        this.logout();
      }
    });
  }

  activateUser(): void {
    this.selection.selected.forEach((user: User) => {
      user.isActivate = true;
      this.admin.activateUser(user).subscribe((users: User[]) => {
        this.initTable(users);
      });
    });
  }

  deleteUser(): void {
    this.selection.selected.forEach((user: User) => {
      this.admin.deleteUser(user._id).subscribe((users: User[]) => {
        this.initTable(users);
      });
    });
  }

  changeRole(): void {
    this.selection.selected.forEach((user: User) => {
      user.isAdmin = !user.isAdmin;
      this.admin.changeRole(user).subscribe((users: User[]) => {
        this.initTable(users);
      });
      if (this.isSelectedUserInSystem(user)) {
        this.logout();
      }
    });
  }

  private initTable(users: User[]) {
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoaded = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToProfile(event: Event, uid: string) {
    this.route.navigate(['/user', uid]);
    event.stopPropagation();
  }

  private isSelectedUserInSystem(user: User): boolean {
    return this.user.user._id === user._id;
  }

  private logout() {
    this.auth.setLoggedIn({isAuth: false});
    this.user.logOut().subscribe();
    this.route.navigate(['/']);
  }
}
