import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from 'src/app/core/service/env.service';
import { CategoryTagService } from 'src/app/data/service/category-tag/category-tag.service';
// import { DocumentsService } from 'src/app/data/service/documents/documents.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { UserService } from 'src/app/data/service/user.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });
  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  notiName: string;


  paramsQuery = {
    keyword: '',
    page: '1',
    size: '10',
    account: '',
  };

  agencyName: string;
  duplicateCode = false;

  pageConfiguration: any
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private keycloakService: KeycloakService,
    private userService: UserService,
    private envService: EnvService,
    private snackbarService: SnackbarService,
    private categoryTagService: CategoryTagService,
    // private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmAddDialogModel,
    @Inject(LOCALE_ID) protected localeId: string
  ) { }

  ngOnInit(): void {

  }

  async onConfirmAdd() {
    let arrLanguageId = '';
    let checkContent = true;
    let checkFile = true;
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    let regExpContent = true;
    let regExpSymbol = true;
    let checkSymbol = true;
    let checkCharsContent = true;
    let checkCharsSymbol = true;
    const formObj = this.addForm.getRawValue();
    // tslint:disable-next-line: prefer-for-of
    if (formObj.name.trim() === '') {
      checkContent = false;
    } else {
      formObj.name = formObj.name.trim();
      if (formObj.name.length > 50)
        checkCharsContent = false;
    }

    if (regExp.test(formObj.name)) {
      regExpContent = false;
    }

    if (formObj.code.trim() === '') {
      checkSymbol = false;
    } else {
      // Assign code value
      formObj.code = formObj.code.trim();
    }
    if (formObj.code.length > 50) {
      checkCharsSymbol = false;
    }
    if (regExp.test(formObj.code)) {
      regExpSymbol = false;
    }

    if (!this.addForm.invalid && checkContent && regExpContent && regExpSymbol && !this.duplicateCode && checkSymbol && checkCharsContent && checkCharsSymbol) {
    // if (true) {
      let tempName = {
        name: formObj.name,
        description: formObj.description
      }
      this.notiName =  formObj.name.trim();
      formObj.name = tempName;
      const resultJson = JSON.stringify(formObj, null, 2);
      this.postCategoryTag(resultJson);
    } else {
      if (this.addForm.invalid) {
        let content = "Vui lòng nhập đầy đủ thông tin";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkSymbol) {
        let content = "Số ký hiệu không được phép rỗng. Vui lòng kiểm tra lại!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!regExpSymbol) {
        let content = "Số ký hiệu chứa ký tự đặc biệt. Vui lòng kiểm tra lại!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (this.duplicateCode) {
        let content = "Dữ liệu đã tồn tại. Vui lòng kiểm tra lại!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkContent) {
        let content = "Tên loại nhãn không được phép rỗng. Vui lòng kiểm tra lại!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!regExpContent) {
        let content = "Nội dung chứa ký tự đặc biệt. Vui lòng kiểm tra lại!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkFile) {
        let content = "Vui lòng chọn tệp đính kèm!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      }
    }
  }
  onDismiss(): void {
    this.dialogRef.close();
  }

  checkDuplicateCode() {
    const formObj = this.addForm.getRawValue();
    this.duplicateCode = false;
    const accountId = sessionStorage.getItem('accountId');
    const code = formObj.code.trim();
    const check = '?code=' + code;
    this.categoryTagService.checkDuplicateCode(check).subscribe(res => {
      if (res > 0) {
        this.duplicateCode = false;
      }
    });
  }


  postCategoryTag(requestBody) {
    this.categoryTagService.postCategoryTag(requestBody).subscribe(data => {
      const result = {
        translate: this.notiName,
        status: true
      };
      this.dialogRef.close(result);
    }, err => {
      const result = {
        translate: this.notiName,
        status: false
      };
      this.dialogRef.close(result);
    });
  }

}
export class ConfirmAddDialogModel {
  constructor() {
  }
}

