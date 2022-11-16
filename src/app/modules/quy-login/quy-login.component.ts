import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../services/login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { SnackbarService } from '../services/snackbar/snackbar.service';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-quy-login',
  templateUrl: './quy-login.component.html',
  styleUrls: ['./quy-login.component.scss']
})
export class QuyLoginComponent implements OnInit {
  loginForm = new FormGroup({
    lusername: new FormControl(''),
    lpassword: new FormControl('')
  });
  lusername = new FormControl('', [Validators.required]);
  lpassword = new FormControl('', [Validators.required]);


  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    fullName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
  });
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);

  duplicateUsername = false;
  duplicateEmail = false;
  // username = new FormControl('', [Validators.required]);
  // password = new FormControl('', [Validators.required]);
  // username: string = "";
  // password: string = "";
  message: any;
  selectedIndex: any;

  mailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    // this.login(this.username, this.password);
    // this.login('admin', 'admin');

  }

  onConfirmLogin() {
    const formObj = this.loginForm.getRawValue();
    let username = formObj.lusername.trim();
    let password = formObj.lpassword.trim();

    if (!this.loginForm.invalid && username != null && username != "" && password != null && password != "") {
      let tempResult = {
        username: btoa(username),
        password: btoa(password)
      }
      const resultJson = JSON.stringify(tempResult, null, 2);
      this.authService.authen(resultJson).subscribe(res => {
        console.log("day la res", res);
        if (res.error == false) {
          this.snackbarService.openSnackBar(1, "", "Đăng nhập thành công", 'success_notification', 2000);
          this.authService.setTokenAndInitialValue(res.token);
          this.authService.login(true);
        } else {
          this.snackbarService.openSnackBar(0, "Thất bại", "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại", 'warn_notification', 2000)
        }
      });
    } else if (username == "") {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập tên đăng nhập", 'warn_notification', 2000)
    }
    else if (password == "") {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập mật khẩu", 'warn_notification', 2000)
    }
    else {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập dữ liệu", 'warn_notification', 2000)
    }

  }

  onConfirmRegister() {
    const formObj = this.registerForm.getRawValue();
    formObj.username = formObj.username.trim();
    formObj.password = formObj.password.trim();
    formObj.email = formObj.email.trim();
    formObj.fullName = formObj.fullName.trim();
    formObj.phoneNumber = formObj.phoneNumber.trim();
    formObj.address = formObj.address.trim();
    formObj.role = "user";

    let checkUsernameLength = true;
    let checkPasswordLength = true;
    let checkMail = true;
    let checkPhoneNumber = true;

    if (formObj.username.length <= 4) {
      checkUsernameLength = false;
    }
    if (formObj.password.length <= 4) {
      checkPasswordLength = false;
    }

    if (!this.mailRegex.test(formObj.email)) {
      checkMail = false;
    }

    if (!this.phoneRegex.test(formObj.phoneNumber)) {
      checkPhoneNumber = false;
    }

    if (!this.registerForm.invalid && checkMail && checkPasswordLength && checkUsernameLength && !this.duplicateUsername && !this.duplicateEmail  && checkPhoneNumber) {
      const resultJson = JSON.stringify(formObj, null, 2);
      console.log("day la resultJson", resultJson);
      this.authService.register(resultJson).subscribe(res => {
        if (res.error == false) {
          this.snackbarService.openSnackBar(1, "", "Đăng nhập thành công", 'success_notification', 2000);
          // localStorage.setItem ('token', res.token);
          // this.router.navigate(['home']);
        } else {
          this.snackbarService.openSnackBar(0, "Thất bại", "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại", 'warn_notification', 2000)
        }
      });
    } else if (this.registerForm.invalid) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập đầy đủ dữ liệu", 'warn_notification', 2000)
    }
    else if (!checkMail && formObj.email.trim().length > 0) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập mail đúng định dạng", 'warn_notification', 2000)
    }
    else if (!checkUsernameLength) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Tài khoản phải bao gồm 8 ký tự!", 'warn_notification', 2000)
    }
    else if (!checkPasswordLength) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Mật khẩu phải bao gồm 8 ký tự!", 'warn_notification', 2000)
    }
    else if (this.duplicateUsername) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Tài khoản đã được sử dụng, vui lòng chọn tên khác!", 'warn_notification', 2000)
    }
    else if (this.duplicateEmail) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Mail đã được sử dụng, vui lòng chọn mail khác", 'warn_notification', 2000)
    }
    else if (!checkPhoneNumber) {
      this.snackbarService.openSnackBar(0, "Thất bại", "Số điện thoại không đúng định dạng, vui lòng thử lại", 'warn_notification', 2000)
    }
    else {
      this.snackbarService.openSnackBar(0, "Thất bại", "Vui lòng nhập dữ liệu", 'warn_notification', 2000)
    }
  }

  checkDuplicate(action) {
    const formObj = this.registerForm.getRawValue();
    let code: string;
    if (action == 1) {
      code = formObj.username.trim();
    } else {
      code = formObj.email.trim();
    }
    const check = '?code=' + code + '&action=' + action;
    this.authService.checkDuplicateCode(check).subscribe(res => {
      if (res > 0) {
        if (action == 1) {
          this.duplicateUsername = true;
        } else {
          this.duplicateEmail = true;
        }
      } else {
        if (action == 1) {
          this.duplicateUsername = false;
        } else {
          this.duplicateEmail = false;
        }
      }
    });
  }

  setSelected(id: number) {
    this.selectedIndex = id;
  }
}
