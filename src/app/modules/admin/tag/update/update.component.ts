import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from 'src/app/core/service/env.service';
import { TagService } from 'src/app/data/service/tag/tag.service';
// import { DocumentsService } from 'src/app/data/service/documents/documents.service';
import { CategoryTagService } from 'src/app/data/service/category-tag/category-tag.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { UserService } from 'src/app/data/service/user.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { ConfirmAddDialogModel } from '../add/add.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateForm = new FormGroup({
    order: new FormControl('1'),
    code: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl('1'),
    type: new FormControl(''),
    description: new FormControl(''),
  });
  code = new FormControl('', [Validators.required]);
  order = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  listType = {};
  listCategory = [];

  listStatus = [
    {
      id: 0,
      name: 'Đóng'
    },
    {
      id: 1,
      name: 'Mở'
    }
  ];

  duplicateCode = false;
  tagId: string;
  response: any;
  notiName: any;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private keycloakService: KeycloakService,
    private userService: UserService,
    private envService: EnvService,
    private snackbarService: SnackbarService,
    private tagService: TagService,
    // private documentsService: DocumentsService,
    private categoryTagService: CategoryTagService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmUpdateDialogModel,
    @Inject(LOCALE_ID) protected localeId: string
  ) { 
    this.tagId = data.id;

  }

  ngOnInit(): void {
    this.getListCategory();
    this.getDetailTag(this.tagId);

  }

  async onConfirmAdd() {
    let checkLanguageId = true;
    let arrLanguageId = '';
    let checkContent = true;
    const regExp = new RegExp("/[*+?^${}()|[\]\\<>@;!#%^&:~='_`]/g");
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
    }
    if (formObj.name.length > 500) {
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
    if (!this.updateForm.invalid && checkLanguageId && checkContent && regExpContent && regExpSymbol && !this.duplicateCode && checkSymbol && checkCharsContent && checkCharsSymbol) {
      this.notiName = formObj.name.trim();
      this.getCategoryById(formObj.type);
      this.listType = await this.getCategoryById(formObj.type);
      formObj.type = this.listType;

      let tempName = {
        name: formObj.name,
        description: formObj.description
      }
      formObj.name = tempName;
      const resultJson = JSON.stringify(formObj, null, 2);
      this.putTags(resultJson);
    } else {
      if (this.updateForm.invalid) {
        const content = $localize`:@@pleaseEnterYourFullDetail:Vui lòng nhập đầy đủ thông tin`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkSymbol) {
        const content = $localize`:@@symbolsCannotBeEmpty:Số ký hiệu không được phép rỗng. Vui lòng kiểm tra lại!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!regExpSymbol) {
        const content = $localize`:@@symbolContainSpecialCharaters:Số ký hiệu chứa ký tự đặc biệt. Vui lòng kiểm tra lại!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (this.duplicateCode) {
        const content = $localize`:@@dataAlreadyExists:Dữ liệu đã tồn tại. Vui lòng kiểm tra lại!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkContent) {
        let content = $localize`:@@tagNameCannotBeEmpty:Tên nhãn không được phép rỗng. Vui lòng kiểm tra lại!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!regExpContent) {
        const content = $localize`:@@contentContainSpecialCharacters:Nội dung chứa ký tự đặc biệt. Vui lòng kiểm tra lại!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      } else if (!checkLanguageId) {
        const content = $localize`:@@languageCannotBeDuplicate:Nội dung bị trùng ngôn ngữ. Vui lòng chọn lại ngôn ngữ khác!`;
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      }
    }
  }
  onDismiss(): void {
    this.dialogRef.close();
  }

  checkDuplicateCode() {
    const formObj = this.updateForm.getRawValue();
    this.duplicateCode = false;
    const accountId = sessionStorage.getItem('accountId');
    const code = formObj.code.trim();
    const check = '?code=' + code;
    this.tagService.checkDuplicateCode(check).subscribe(res => {
      if (res > 0) {
        this.duplicateCode = true;
      }
    });
  }

  getListCategory() {
    this.categoryTagService.getListCategory('').subscribe(data => {
      for (let i = 0; i < data.numberOfElements; i++) {
        this.listCategory.push(data.content[i]);
      }
    }, err => {
      console.log(err);
    });
  }

  getCategoryById(id) {
    return new Promise(resolve => {
      this.categoryTagService.getDetailCategoryTag(id).subscribe(data => {
        resolve(data);
      });
    });
  }

  getDetailTag(id) {
    this.tagService.getDetailTag(id).subscribe(data => {
      this.response = data;
      // this.isUse = this.response[0].usageCount > 0 ? true : false;

      this.setViewData();
    });
  }

  setViewData() {
    this.updateForm = new FormGroup({
      code: new FormControl({ value: this.response.code, disabled: true }),
      type: new FormControl('' + this.response.type.id),
      // type: new FormControl({ value: this.response[0].type[0].id, disabled: true }),
      status: new FormControl('' + this.response.status),
      order: new FormControl('' + this.response.order),
      name: new FormControl('' + this.response.name.name),
      description: new FormControl('' + this.response.name.description),
    });

  }


  putTags(requestBody) {
    this.tagService.putTag(this.tagId, requestBody).subscribe(data => {
      let result;
      if (data.affectedRows > 0) {
        result = {
          translate: this.notiName,
          status: true
        };
      }
      else {
        result = {
          translate: this.notiName,
          status: false
        };
      }
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

export class ConfirmUpdateDialogModel {
  constructor(public id: string) {
  }
}
