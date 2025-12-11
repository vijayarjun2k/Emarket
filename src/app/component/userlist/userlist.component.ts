import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Users } from '../../Store/Model/User.model';
import { getuserlist } from '../../Store/User/User.Selectors';
import { getusers } from '../../Store/User/User.action';
import { RolepopupComponent } from '../rolepopup/rolepopup.component';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatButtonModule
  ],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  userlist!: Users[];
  displayedColums: string[] = ['username', 'name', 'email', 'role', 'status', 'action']
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.store.dispatch(getusers());
    this.store.select(getuserlist).subscribe(item => {
      this.userlist = item;
      this.datasource = new MatTableDataSource<Users>(this.userlist)
      this.datasource.paginator = this.paginator
      this.datasource.sort = this.sort
    })
  }

  FunctionChangeRole(username: string) {
    this.OpenPopup(username)
  }

  constructor(private store: Store, private dialog: MatDialog) {

  }

  OpenPopup(username: string) {
    this.dialog.open(RolepopupComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: username
      }
    })

  }

}
