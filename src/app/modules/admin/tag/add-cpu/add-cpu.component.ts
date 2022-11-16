import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from 'src/app/core/service/env.service';
// import { DocumentsService } from 'src/app/data/service/documents/documents.service';
import { TagService } from 'src/app/data/service/tag/tag.service';
// import { OfficerListService } from 'src/app/data/service/officer-list/officer-list.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/data/service/user.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { CpuService } from 'src/app/data/service/cpu/cpu.service';
// import { FileService } from 'src/app/data/service/file/file.service';

@Component({
  selector: 'app-add-cpu',
  templateUrl: './add-cpu.component.html',
  styleUrls: ['./add-cpu.component.scss']
})
export class AddCpuComponent implements OnInit {
  addForm = new FormGroup({
    brand: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    core: new FormControl(''),
    coreNumber: new FormControl(''),
    threadNumber: new FormControl(''),
    baseClock: new FormControl(''),
    boostClock: new FormControl('')
  });
  brand = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  core = new FormControl('', [Validators.required]);
  coreNumber = new FormControl('', [Validators.required]);
  threadNumber = new FormControl('', [Validators.required]);
  baseClock = new FormControl('', [Validators.required]);
  boostClock = new FormControl('', [Validators.required]);

  brandList = [];
  coreList = [];
  selectedBrand = {};
  selectedCore = {};

  duplicateCode = false;
  notiName: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private keycloakService: KeycloakService,
    private userService: UserService,
    private envService: EnvService,
    private snackbarService: SnackbarService,
    // private documentsService: DocumentsService,
    // private oficerListService: OfficerListService,
    // private activeRoute: ActivatedRoute,
    private tagService: TagService,
    private cpuSevice: CpuService,
    // private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddCpuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCPUConfirmAddDialogModel,
    @Inject(LOCALE_ID) protected localeId: string
  ) { }

  ngOnInit(): void {
    this.getBrandList('?category-id=6354b9a1b58a1079f11b6c6d');
    this.getCoreList('?category-id=6354b9f6b58a1079f11b6c6e');
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
    const formObj = this.addForm.getRawValue();

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
    if (!this.addForm.invalid && checkLanguageId && checkContent && regExpContent && regExpSymbol && !this.duplicateCode && checkSymbol && checkCharsContent && checkCharsSymbol) {
      this.notiName = formObj.name;
      formObj.brand = this.selectedBrand;
      formObj.core = this.selectedCore;

      const resultJson = JSON.stringify(formObj, null, 2);
      this.postTag(resultJson);
    } else {
      if (this.addForm.invalid) {
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

  postTag(requestBody) {
    this.cpuSevice.postCPU(requestBody).subscribe(data => {
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
    console.log(requestBody);
  }

  getBrandList(id) {
    this.tagService.getListTag(id).subscribe(data => {
      for (let i = 0; i < data.numberOfElements; i++) {
        this.brandList.push(data.content[i]);
      }
    }, err => {
      console.log(err);
    });
  }

  getCoreList(id) {
    this.tagService.getListTag(id).subscribe(data => {
      for (let i = 0; i < data.numberOfElements; i++) {
        this.coreList.push(data.content[i]);
      }
    }, err => {
      console.log(err);
    });
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  checkDuplicateCode() {
    const formObj = this.addForm.getRawValue();
    this.duplicateCode = false;
    const code = formObj.code.trim();
    const check = '?code=' + code;
    this.tagService.checkDuplicateCode(check).subscribe(res => {
      if (res > 0) {
        this.duplicateCode = true;
      }
    });
  }

  onBrandChange(event){
    this.selectedBrand = this.brandList.find((element, index) => {
      return element.id === event;
    });
  }

  onCoreChange(event){
    this.selectedCore = this.coreList.find((element, index) => {
      return element.id === event;
    });
  }
}

export class AddCPUConfirmAddDialogModel {
  constructor() {
  }
}