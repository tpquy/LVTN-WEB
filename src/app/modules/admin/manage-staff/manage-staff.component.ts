import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { DetailProfileDialogModel, StaffDetailComponent } from './staff-detail/staff-detail.component';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Staff {
  id: string,
  code: string,
  name: string,
  avatar: string,
  role: string,
  mail: string,
  phone: string,
  age: string,
  work: string,
  status: number
}

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'avatar', 'name', 'role', 'contact', 'age', 'work', 'status', 'action'];
  ELEMENTDATA: any[] = [];
  dataSource: MatTableDataSource<any>;
  roleList: {} = [
    {
      code: "transportStaff",
      name: "Nhân viên vận chuyển"
    },
    {
      code: "orderAdmin",
      name: "Nhân viên bán hàng"
    },
    {
      code: "productAdmin",
      name: "Thủ kho"
    },
    {
      code: "webAdmin",
      name: "Quản lý website"
    }
  ]

  size = 10;
  pageIndex = 1;
  page = 1;
  countResult = 0;
  numberSubstr = 50;
  pgSizeOptions = [1, 5, 10, 15];


  searchForm = new FormGroup({
    keyword: new FormControl(''),
    role: new FormControl(''),
    sorting: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private authService: AuthService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.ELEMENTDATA);
  }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('staff');
    const searchString = '?page=0&size=10&spec=page&keyword=&sort-by=age&type=0';
    this.getListUser(searchString);
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddStaffComponent, {
      width: '60vw',
      maxHeight: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.paginate(this.pageIndex, 0);
    });
  }

  openDetailDialog(id) {
    const dialogData = new DetailProfileDialogModel(id);
    const dialogRef = this.dialog.open(StaffDetailComponent, {
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

  onConfirmSearch() {
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    const formObj = this.searchForm.getRawValue();
    console.log("xxxxx", formObj);
    this.pageIndex = 1;
    const searchString =
      '?page=0&size=' + this.size +
      '&spec=page&keyword=' + formObj.keyword.replace(regExp, "").trim() +
      '&role=' + formObj.role +
      '&type=0' +
      '&sort-by=' + formObj.sorting;
    this.getListUser(searchString);
  }

  formatDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
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
          '&type=0' +
          '&sort-by=' + formObj2.sorting;
        this.getListUser(searchString2);
        break;
    }
  }
}
