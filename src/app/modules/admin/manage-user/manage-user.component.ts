import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailUserDialogModel, UserDetailComponent } from './dialog/user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';

export interface User {
  id: string,
  code: string,
  name: string,
  gender: string,
  mail: string,
  phone: string,
  age: string,
  join: string,
  done: string,
}

const ELEMENT_DATA: User[] = [
  { id: 'asd212a1sd21as', code: 'NV01', name: 'Nguyễn Minh Luân', mail: 'mmmm@gamil.com', phone: '0123123', age: '18', join: '1 year', done: '100%', gender: 'male' },
  { id: 'asd212a1sd21as', code: 'NV01', name: 'Nguyễn Minh Luân', mail: 'mmmm@gamil.com', phone: '0123123', age: '18', join: '1 year', done: '100%', gender: 'female' },
  { id: 'asd212a1sd21as', code: 'NV01', name: 'Nguyễn Minh Luân', mail: 'mmmm@gamil.com', phone: '0123123', age: '18', join: '1 year', done: '100%', gender: 'female' },
  { id: 'asd212a1sd21as', code: 'NV01', name: 'Nguyễn Minh Luân', mail: 'mmmm@gamil.com', phone: '0123123', age: '18', join: '1 year', done: '100%', gender: 'male' },
];
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  searchForm = new FormGroup({
    keyword: new FormControl(''),
    role: new FormControl(''),
    sorting: new FormControl(''),
    status: new FormControl(''),
  });

  displayedColumns: string[] = ['stt', 'name', 'age', 'gender', 'contact', 'join', 'action'];

  ELEMENTDATA: any[] = [];
  dataSource: MatTableDataSource<any>;

  size = 10;
  pageIndex = 1;
  page = 1;
  countResult = 0;
  numberSubstr = 50;
  pgSizeOptions = [1, 5, 10, 15];

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private authService: AuthService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.ELEMENTDATA);
  }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('user');
    const searchString = '?page=0&size=10&spec=page&keyword=&sort-by=age&role=user&type=1';
    this.getListUser(searchString);
  }

  getListUser(searchString) {
    this.authService.getListUser(searchString).subscribe(data => {
      this.ELEMENTDATA = [];
      this.countResult = data.totalElements;
      for (let i = 0; i < data.numberOfElements; i++) {
        data.content[i].stt = this.size * (this.pageIndex - 1) + (i + 1);
        this.ELEMENTDATA.push(data.content[i]);
      }
      this.dataSource.data = this.ELEMENTDATA;
    });
  }

  dateFormating(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy')
  }

  formatDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }

  onConfirmSearch() {
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    const formObj = this.searchForm.getRawValue();
    console.log("xxxxx", formObj);
    this.pageIndex = 1;
    const searchString =
      '?page=0&size=' + this.size +
      '&spec=page&keyword=' + formObj.keyword.replace(regExp, "").trim() +
      '&role=user' +
      '&type=0' +
      '&sort-by=' + formObj.sorting;
    this.getListUser(searchString);
  }

  openDetailDialog(id) {
    const dialogData = new DetailUserDialogModel(id);
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '60vw',
      maxHeight: '80%',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.paginate(this.pageIndex, 0);
      }
    });
  }

  paginate(event: any, type) {
    switch (type) {
      case 0:
        this.pageIndex = event;
        this.page = event;
        const regExp1 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj1 = this.searchForm.getRawValue();
        const searchString1 =
          '?page=' + (this.pageIndex - 1) + '&size=' + this.size +
          '&spec=page&keyword=' + formObj1.keyword.replace(regExp1, "").trim() +
          '&role=user' +
          '&type=0' +
          '&sort-by=' + formObj1.sorting;
        this.getListUser(searchString1);
        break;
      case 1:
        this.pageIndex = 1;
        this.page = 1;
        const regExp2 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj2 = this.searchForm.getRawValue();
        const searchString2 =
          '?page=' + (this.pageIndex - 1) + '&size=' + this.size +
          '&spec=page&keyword=' + formObj2.keyword.replace(regExp2, "").trim() +
          '&role=user' +
          '&type=0' +
          '&sort-by=' + formObj2.sorting;
        this.getListUser(searchString2);
        break;
    }
  }
}
