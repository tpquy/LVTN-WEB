import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { CategoryTagService } from 'src/app/data/service/category-tag/category-tag.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });
  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  documentsId: string;
  response: any;

  duplicateSymbol = false;
  duplicateCode = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService,
    private categoryTagService: CategoryTagService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmUpdateDialogModel,
    @Inject(LOCALE_ID) protected localeId: string
  ) {
    this.documentsId = data.id;
   }

  ngOnInit(): void {
    this.getDetailCategoryTag(this.documentsId);
  }

  
  async onConfirmUpdate() {
    let arrLanguageId = '';
    let checkContent = true;
    let checkFile = true;
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    let regExpContent = true;
    let regExpSymbol = true;
    let checkSymbol = true;
    let checkCharsContent = true;
    let checkCharsSymbol = true;
    const formObj = this.updateForm.getRawValue();
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

    if (!this.updateForm.invalid && checkContent && regExpContent && regExpSymbol && !this.duplicateCode && checkSymbol && checkCharsContent && checkCharsSymbol) {
    // if (true) {
      let tempName = {
        name: formObj.name,
        description: formObj.description
      }
      formObj.name = tempName;
      const resultJson = JSON.stringify(formObj, null, 2);
      this.putCategoryTag(resultJson);
    } else {
      if (this.updateForm.invalid) {
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

  getDetailCategoryTag(id) {
    this.categoryTagService.getDetailCategoryTag(id).subscribe(data => {
      this.response = data;
      this.setViewData();
    });
  }

  setViewData() {
    // this.name = [];
    // this.name = this.response.name;
    // let tempName = this.name[0].name;
    this.updateForm = new FormGroup({
      code: new FormControl({ value: this.response.code, disabled: true }),
      name: new FormControl('' + this.response.name.name),
      description: new FormControl('' + this.response.name.description),
    });

  }

  onDismiss(): void {
    this.dialogRef.close();
  }
  checkDuplicateCode() {
    const formObj = this.updateForm.getRawValue();
    this.duplicateSymbol = false;
    const code = formObj.code;
    const accountId = sessionStorage.getItem('accountId');
    const check = '?account-id=' + accountId + '&code=' + code;
    this.categoryTagService.checkDuplicateCode(check).subscribe(res => {
      if (res > 0) {
        this.duplicateSymbol = true;
      }
    });
  }

  putCategoryTag(requestBody) {
    this.categoryTagService.putCategoryTag(this.documentsId, requestBody).subscribe(data => {
      let result;
      if (data.affectedRows > 0) {
        result = {
          translate: this.response.name.name,
          status: true
        };
      }
      else {
        result = {
          translate: this.response.name.name,
          status: false
        };
      }
      this.dialogRef.close(result);
    }, err => {
      const result = {
        translate: this.response.name.name,
        status: false
      };
      this.dialogRef.close(result);
    });
  }


}

export class ConfirmUpdateDialogModel {
  constructor(public id: string) {
  }
}
