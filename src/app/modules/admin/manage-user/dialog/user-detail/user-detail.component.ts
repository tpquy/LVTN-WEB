import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { OrderService } from 'src/app/data/service/order/order.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  roleList : {} = [
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
  // constructor() { }

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    birthDay: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
  });

  role;
  response: any;
  userId;
  employeeCode: any;
  profileId: any;
  orderList: any;

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private authService: AuthService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailUserDialogModel,
  ) {
    // alert(data);
    this.profileId = data.id;
  }

  ngOnInit(): void {
    this.getDetailProfile(this.profileId);
    this.getListOrder(this.profileId);
  }
  onDismiss() {
    this.dialogRef.close(0)
  }

  getDetailProfile(id) {
    this.authService.getDetailUser(id).subscribe(data => {
      this.response = data;
      this.setViewData();
    });
  }

  getListOrder(id) {
    const searchString = '?page=0&size=10&spec=page&keyword=&user-id=' +id;
    this.orderService.getListOrder(searchString).subscribe(data => {
      // this.response = data;
      // this.setViewData();
      this.orderList = data;
      // console.log(data);
    });
  }

  viewDetail (id) {
    this.dialogRef.close(0);
    this.router.navigate(['/admin/order-management/order-detail/' + id]);
    // /admin/order-management/order-detail
  }

  onSubmit(){
    let formObj = this.profileForm.getRawValue();
    let checkContent = true;
    if (formObj.username.trim() == "" || formObj.password.trim() == "" ||
        formObj.fullName.trim() == "" || formObj.email.trim() == "" ||
        formObj.email.trim() == "" || formObj.phoneNumber.trim() == "" ||
        formObj.birthDay.trim() == "" || formObj.gender.trim() == "" ||
        formObj.address.trim() == "" || formObj.role.trim() == ""
    ) {
      checkContent = false; 
    }
    const resultJson = JSON.stringify(formObj, null, 2);

    if (checkContent) {
      this.authService.putUser(this.profileId, resultJson).subscribe(data => {
        if (data.affectedRows > 0) {
          let titleNoti = "Cập nhật thành công" + "!";
          this.snackbarService.openSnackBar(1, titleNoti, "", 'success_notification', 2000);
          this.dialogRef.close(data.affectedRows);
        }
        else {
          let titleNoti = "Cập nhật thất bại" + "!";
          this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
          this.dialogRef.close(data.affectedRows);
        }
      }, err => {
        let titleNoti = "Cập nhật thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
        this.dialogRef.close(0);
      });
    } else {
      let titleNoti = "Cập nhật thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, "Vui lòng nhập đầy đủ thông tin", 'error_notification', 2000);
        // this.dialogRef.close(0);
    }
  }

  setViewData() {
    this.profileForm = new FormGroup({
      fullName: new FormControl('' + this.response.fullName),
      username: new FormControl('' + this.response.username),
      password: new FormControl('' + this.response.password),
      email: new FormControl('' + this.response.email),
      phoneNumber: new FormControl('' + this.response.phoneNumber),
      birthDay: new FormControl(this.response.birthDay != null ? this.datePipe.transform(this.response.birthDay, 'yyyy-MM-dd') : ''),
      gender: new FormControl('' + this.response.gender),
      address: new FormControl('' + this.response.address),
      role: new FormControl(this.response.role),
    });
  }

}

export class DetailUserDialogModel {
  constructor(public id: string) {
  }
}
