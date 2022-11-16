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
import { FileService } from 'src/app/data/service/file/file.service';
import { LaptopService } from 'src/app/data/service/laptop/laptop.service';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  addForm = new FormGroup({
    brand: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    cpu: new FormControl(''),
    ram: new FormControl(''),
    rom: new FormControl(''),
    screen: new FormControl(''),
    graphicsCard: new FormControl(''),
    material: new FormControl(''),
    os: new FormControl(''),
    type: new FormControl(''),
    weight: new FormControl(''),
    releaseYear: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    attachment: new FormControl('')
  });
  brand = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  cpu = new FormControl('', [Validators.required]);
  ram = new FormControl('', [Validators.required]);
  rom = new FormControl('', [Validators.required]);
  screen = new FormControl('', [Validators.required]);
  graphicsCard = new FormControl('', [Validators.required]);
  material = new FormControl('', [Validators.required]);
  os = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  weight = new FormControl('', [Validators.required]);
  releaseYear = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  quantity = new FormControl('', [Validators.required]);
  attachment = new FormControl('', [Validators.required]);


  duplicateCode = false;
  notiName: any;

  objList = [
    {
      id: "6350f94a417f2758b415a577",
      order: 1
    },
    {
      id: "6351008856e3ef1ea8f3523e",
      order: 2
    },
    {
      id: "6355dea9b63f202f3537eb79",
      order: 3
    },
    {
      id: "6355ded0b63f202f3537eb7a",
      order: 4
    },
    {
      id: "6355def5b63f202f3537eb7b",
      order: 5
    },
    {
      id: "6355df28b63f202f3537eb7c",
      order: 6
    },
    {
      id: "6355df45b63f202f3537eb7d",
      order: 7
    },
    {
      id: "6355df8bb63f202f3537eb7e",
      order: 8
    }
  ];

  brandList = [];
  cpuList = [];
  ramList = [];
  romList = [];
  screenList = [];
  graphicsCardList = [];
  materialList = [];
  osList = [];
  typeList = [];

  selectedBrand = {};
  selectedCPU = {};
  selectedRam = {};
  selectedRom = {};
  selectedScreen = {};
  selectedgraphicsCard = {};
  selectedMaterial = {};
  selectedOS = {};
  selectedType = {};

  // file
  acceptFileExtension = ['.JPG', '.JPEG', '.PNG'];
  listAcceptFileType = [];
  attachFiles = [];
  attachFilePreview = [];
  blankVal: any;
  fileUnits: ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

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
    private fileService: FileService,
    private laptopService: LaptopService,
    // private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddNewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProductConfirmAddDialogModel,
    @Inject(LOCALE_ID) protected localeId: string
  ) { }

  ngOnInit(): void {
    this.initAllTag(this.objList);
    this.getCPUList('');
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
    let checkFile = true;
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

    if (this.attachFilePreview.length == 0) {
      checkFile = false;
    }
    if (!this.addForm.invalid && checkLanguageId && checkContent && regExpContent && regExpSymbol && !this.duplicateCode && checkSymbol && checkCharsContent && checkCharsSymbol && checkFile) {
      this.notiName = formObj.name;
      formObj.cpu = this.selectedCPU;
      formObj.brand = this.selectedBrand;
      formObj.type = this.selectedType;
      formObj.ram = this.selectedRam;
      formObj.rom = this.selectedRom;
      formObj.screen = this.selectedScreen;
      formObj.graphicsCard = this.selectedgraphicsCard;
      formObj.material = this.selectedMaterial;
      formObj.os = this.selectedOS;
      formObj.img = this.attachFilePreview;
      const resultJson = JSON.stringify(formObj, null, 2);
      this.postLaptop(resultJson);
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
      } else if (!checkFile) {
        const content = "Vui lòng chọn tệp đính kèm!";
        this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
      }
    }
  }

  postLaptop(requestBody) {
    this.laptopService.postLaptop(requestBody).subscribe(data => {
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
    // console.log(requestBody);
  }

  // initial data when fisrt loading page - START
  initAllTag(objList) {
    objList.forEach(element => {
      this.getList('?category-id=' + element.id, element.order);
    });
  }

  pushData(data, array) {
    for (let i = 0; i < data.numberOfElements; i++) {
      array.push(data.content[i]);
    }
  }

  getList(searchString, type) {
    this.tagService.getListTag(searchString).subscribe(data => {
      switch (type) {
        case 1:
          this.pushData(data, this.brandList);
          break;
        case 2:
          this.pushData(data, this.ramList);
          break;
        case 3:
          this.pushData(data, this.romList);
          break;
        case 4:
          this.pushData(data, this.screenList);
          break;
        case 5:
          this.pushData(data, this.graphicsCardList);
          break;
        case 6:
          this.pushData(data, this.materialList);
          break;
        case 7:
          this.pushData(data, this.osList);
          break;
        case 8:
          this.pushData(data, this.typeList);
          break;
        default:
          console.log("Doesn't match");
      }

    }, err => {
      console.log(err);
    });
  }

  getCPUList(id) {
    this.cpuSevice.getListCPU(id).subscribe(data => {
      for (let i = 0; i < data.numberOfElements; i++) {
        this.cpuList.push(data.content[i]);
      }
    }, err => {
      console.log(err);
    });
  }
  // initial data when fisrt loading page - END


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

  // assign value when changing selection - START
  assignValueForSelectedElement(event, selectedElement, selectedArray){
    selectedElement = selectedArray.find((element, index) => {
      return element.id === event;
    });
    return selectedElement;
  }

  onSelectionChange(event, type) {
    switch (type) {
      case 1:
        this.selectedBrand =  this.assignValueForSelectedElement(event, this.selectedBrand, this.brandList);
        break;
      case 2:
        this.selectedRam = this.assignValueForSelectedElement(event, this.selectedRam, this.ramList);
        console.log(this.selectedRam)
        break;
      case 3:
        this.selectedRom = this.assignValueForSelectedElement(event, this.selectedRom, this.romList);
        break;
      case 4:
        this.selectedScreen = this.assignValueForSelectedElement(event, this.selectedScreen, this.screenList);
        break;
      case 5:
        this.selectedgraphicsCard = this.assignValueForSelectedElement(event, this.selectedgraphicsCard, this.graphicsCardList);
        break;
      case 6:
        this.selectedMaterial = this.assignValueForSelectedElement(event, this.selectedMaterial, this.materialList);
        break;
      case 7:
        this.selectedOS = this.assignValueForSelectedElement(event, this.selectedOS, this.osList);
        break;
      case 8:
        this.selectedType = this.assignValueForSelectedElement(event, this.selectedType, this.typeList);
        break;
      default:
        console.log("Doesn't match");
    }
  }

  onCPUChange(event) {
    this.selectedCPU = this.cpuList.find((element, index) => {
      return element.id === event;
    });
  }
  // assign value when changing selection - END


  // ================================================== file
  showSpinner(doneClass) {
    const checkIcon = document.querySelector('.' + doneClass + ' .mat-spinner');
    (checkIcon as HTMLElement).style.display = 'block';
  }

  bytesToSize(size) {
    if (isNaN(parseFloat(size)) || !isFinite(size)) { return '?'; }
    let unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    return size.toFixed(+ 0) + ' ' + this.fileUnits[unit];
  }

  removeAttachItem(index: number, id, name, doneClass) {
    this.attachFiles.splice(index, 1);
    this.attachFilePreview.splice(index, 1);
    console.log(this.attachFilePreview);
    this.blankVal = '';
    this.deleteFile(id, name, doneClass);
  }
  deleteFile(id, name, doneClass) {
    // this.showSpinner(doneClass);
    this.fileService.deleteFile(id).subscribe(data => {
    }, err => {
      let content = $localize`:@@cannotDeleteFile:Không thể xóa file. Vui lòng kiểm tra lại` + "!";
      this.snackbarService.openSnackBar(0, content, '', 'error_notification', 2000);
    });
  }
  getIconFilename(detailFile) {
    const fileName = detailFile.filename ? detailFile.filename : detailFile.name;
    const fileIcon = fileName.split('.').pop();
    return '/assets/img/file.png';
  }
  onSelectFileAttach(event, doneClass) {
    if (event.target.files.length > 0) {
      let state = $localize`:@@error:Lỗi` + "!";
      let content = $localize`:@@thisFileTypeIsNotSupported:Không hỗ trợ dạng tệp tin này, vui lòng chọn loại tệp tin khác` + "!";
      // if ((this.listAcceptFileType.filter(type => type.toLowerCase() === event.target.files[0].type.toLowerCase())).length < 1) {
      if (false) {
        this.snackbarService.openSnackBar(0, state, content, 'error_notification', 2000);
        event.target.value = null;
      } else {
        console.log(event.target.files);
        this.attachFiles.push(event.target.files);
        const temp = [];
        let checkSize = true;
        for (let k = 0; k < event.target.files.length; k++) {
          if ((50 * 1024) > (event.target.files[k].size / 1024)) {
            temp.push(event.target.files[k]);
          } else checkSize = false;
        }
        if (!checkSize) {
          let content = $localize`:@@existingOversizedFile:Tồn tại tệp tin vượt quá kích thước tối đa. Vui lòng kiểm tra lại` + "!";
          this.snackbarService.openSnackBar(2, content, '', 'warn_notification', 2000);
        }
        this.fileService.uploadMultiFile(temp, sessionStorage.getItem('accountId')).subscribe(data => {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < data.length; j++) {
            this.attachFilePreview.push({
              id: data[j].id,
              filename: data[j].oldFileName.substr(0, 50),
              oldFileName: data[j].oldFileName,
              newFilename: data[j].newFilename,
              filePath: data[j].filePath
            });
          }
          event.target.value = null;
        });
        console.log('this is a work of art', this.attachFilePreview);
      }
    }
  }
  downloadFile(id, filename) {
    this.fileService.downloadFile(id).subscribe(data => {
      const dataType = data.type;
      const binaryData = [];
      binaryData.push(data);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, err => {
      let content = $localize`:@@fileNotFound:Không tìm thấy file` + "!";
      this.snackbarService.openSnackBar(0, content, '', 'error_notification', 2000);
      console.log(err);
    });
  }

}

export class AddProductConfirmAddDialogModel {
  constructor() {
  }
}