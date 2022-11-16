import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    birthDay: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
  });

  role;
  response: any;
  userId;
  employeeCode: any;
  startedDay;

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private snackbarService: SnackbarService

  ) {
    this.userId = localStorage.getItem('id');
    this.role = authService.getUserRole();
  }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('account');
    this.getDetailUser(this.userId);
  }

  onSubmit(){
    let formObj = this.profileForm.getRawValue();
    console.log(formObj);
    const resultJson = JSON.stringify(formObj, null, 2);

    this.authService.putUser(this.userId, resultJson).subscribe(data => {
      let result;
      if (data.affectedRows > 0) {
        let titleNoti = "addedSuccessfully:Thêm mới thành công" + "!";
        // tslint:disable-next-line: max-line-length
        this.snackbarService.openSnackBar(1, titleNoti, "", 'success_notification', 2000);
      }
      else {
        let titleNoti = "failedToAdding:Thêm mới thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
      }
    }, err => {
      let titleNoti = "failedToAdding:Thêm mới thất bại" + "!";
      this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
    });
  }

  getDetailUser(id) {
    if (this.userId) {
      this.authService.getDetailUser(id).subscribe(data => {
        this.response = data;
        if (this.response != null && this.response != undefined) {
          this.employeeCode = data.employeeCode;
          this.startedDay = this.datePipe.transform(data.createdDate, 'dd/MM/yyyy'); 
          this.setViewData();
        }
        // this.isUse = this.response[0].usageCount > 0 ? true : false;
      });
    }
  }

  setViewData() {
    this.profileForm = new FormGroup({
      fullName: new FormControl('' + this.response.fullName != null ? this.response.fullName: ''),
      email: new FormControl('' + this.response.email != null ? this.response.email: ''),
      phoneNumber: new FormControl('' + this.response.phoneNumber != null ? this.response.phoneNumber: ''),
      birthDay: new FormControl(this.response.birthDay != null ? this.datePipe.transform(this.response.birthDay, 'yyyy-MM-dd') : ''),
      gender: new FormControl(this.response.gender != null ? this.response.gender.toString() : ''),
      address: new FormControl('' + this.response.address != null ? this.response.address: ''),
    });
  }
}
