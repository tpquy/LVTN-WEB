import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

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

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmAddDialogModel,
  ) {}

  ngOnInit(): void {
  }
  onDismiss() {
    this.dialogRef.close(0)
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
    console.log(resultJson);

    if (checkContent) {
      this.authService.postUser(resultJson).subscribe(data => {
        if (data.affectedRows > 0) {
          let titleNoti = "addedSuccessfully:Thêm mới thành công" + "!";
          this.snackbarService.openSnackBar(1, titleNoti, "", 'success_notification', 2000);
          this.dialogRef.close(data.affectedRows);
        }
        else {
          let titleNoti = "Thêm mới thất bại" + "!";
          this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
          this.dialogRef.close(data.affectedRows);
        }
      }, err => {
        let titleNoti = "Thêm mới thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, "", 'error_notification', 2000);
        this.dialogRef.close(0);
      });
    } else {
      let titleNoti = "Thêm mới thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, "Vui lòng nhập đầy đủ thông tin", 'error_notification', 2000);
        // this.dialogRef.close(0);
    }
  }

}

export class ConfirmAddDialogModel {
  constructor() {
  }
}

