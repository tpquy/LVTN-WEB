import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/core/service/env.service';
import { TagService } from 'src/app/data/service/tag/tag.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { ConfirmDialogComponent, ConfirmationDialogModel } from 'shared/components/dialogs/confirm-dialog/confirm-dialog.component'
import { AddComponent, ConfirmAddDialogModel } from './add/add.component';
import { ConfirmUpdateDialogModel, UpdateComponent } from './update/update.component';
import { AddCpuComponent, AddCPUConfirmAddDialogModel } from './add-cpu/add-cpu.component';
import { CpuService } from 'src/app/data/service/cpu/cpu.service';
import { ConfirmUpdateCPUDialogModel, UpdateCpuComponent } from './update-cpu/update-cpu.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  searchForm = new FormGroup({
    keyword: new FormControl(''),
    account: new FormControl(''),
    tag: new FormControl(''),
  });

  // tag section
  tagDisplayedColumns: string[] = ['stt', 'id', 'symbol', 'tag', 'category', 'description', 'status', 'action'];
  tagELEMENDATA: any[] = [];
  tagDataSource: MatTableDataSource<any>;
  tagSize = 10;
  tagPageIndex = 1;
  tagPage = 1;
  tagCountResult = 0;
  tagList = [];

  // cpu section
  cpuDisplayedColumns: string[] = ['stt', 'id', 'symbol', 'tag', 'category', 'description', 'status', 'action'];
  cpuELEMENTDATA: any[] = [];
  cpuDataSource: MatTableDataSource<any>;
  cpuSize = 10;
  cpuPageIndex = 1;
  cpuPage = 1;
  cpuCountResult = 0;
  // tagList = [];

  // shared
  numberSubstr = 50;
  pgSizeOptions = [5, 10, 15];

  constructor(
    private dialog: MatDialog,
    private envService: EnvService,
    private cdRef: ChangeDetectorRef,
    private snackbarService: SnackbarService,
    private tagService: TagService,
    private cpuService: CpuService,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.tagDataSource = new MatTableDataSource(this.tagELEMENDATA);
    this.cpuDataSource = new MatTableDataSource(this.cpuELEMENTDATA);
  }

  ngOnInit(): void {
    const searchString = '?page=0&size=10&spec=page&keyword=';
    this.getTagList(searchString);
    this.getCPUList(searchString);
  }

  onConfirmSearch() {
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    const formObj = this.searchForm.getRawValue();

    const searchString =
      '?page=0&size=' + this.tagSize +
      '&spec=page&keyword=' + formObj.keyword.replace(regExp, "").trim();
    this.getTagList(searchString);
  }

  getTagList(searchString) {
    this.tagService.getListTag(searchString).subscribe(data => {
      this.tagELEMENDATA = [];
      this.tagCountResult = data.totalElements;
      for (let i = 0; i < data.numberOfElements; i++) {
        data.content[i].stt = this.tagSize * (this.tagPageIndex - 1) + (i + 1);
        this.tagELEMENDATA.push(data.content[i]);
      }
      this.tagDataSource.data = this.tagELEMENDATA;
    });
  }

  getCPUList(searchString) {
    this.cpuService.getListCPU(searchString).subscribe(data => {
      this.cpuELEMENTDATA = [];
      this.cpuCountResult = data.totalElements;
      for (let i = 0; i < data.numberOfElements; i++) {
        data.content[i].stt = this.cpuSize * (this.cpuPageIndex - 1) + (i + 1);
        this.cpuELEMENTDATA.push(data.content[i]);
      }
      this.cpuDataSource.data = this.cpuELEMENTDATA;
    });
  }


  addTags() {
    const dialogData = new ConfirmAddDialogModel();
    const dialogRef = this.dialog.open(AddComponent, {
      width: '1000px',
      height: '700px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "";
      if (res != undefined) {
        contentNoti = res.translate;
        if (res.status === true) {
          const totalPage = Math.ceil((this.tagCountResult + 1) / this.tagSize);
          this.tagPage = totalPage;
          this.tagPaginate(totalPage, 1);
          let titleNoti = "addedSuccessfully:Thêm mới thành công" + "!";
          // tslint:disable-next-line: max-line-length
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
        }
        if (res.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "failedToAdding:Thêm mới thất bại" + "!";
          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  deleteTagsDialog(id, content) {
    let contentNoti = content;
    let dialogTitle = "deleteTag:Xoá nhãn"
    let confirmDelete = "doYouWantToDelete:Bạn có muốn xóa loại nhãn này ra khỏi danh sách" + ": ";
    let dialogContent = contentNoti;
    const dialogData = new ConfirmationDialogModel(dialogTitle, confirmDelete + dialogContent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      if (res === true) {
        this.tagService.deleteTag(id).subscribe(data => {
          this.tagPaginate(this.tagPageIndex, 0);
          //  tslint:disable-next-line: max-line-length
          let titleNoti = '';
          switch (data?.affectedRows) {
            case 0:
              // Xoa that bai
              titleNoti = "failedToDeleting:Xóa thất bại" + "!";
              this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
              break;
            case 1:
              // Xoa thanh cong
              titleNoti = "deletedSuccessfully:Xóa thành công" + "!";
              this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
              break;
            case -1:
              // Da su dung
              titleNoti = "dataWasUsed:Dữ liệu đã sử dụng" + "!";
              this.snackbarService.openSnackBar(2, titleNoti, contentNoti, 'warn_notification', 2000);
              break;
          }
        }, err => {
        });
      }
      if (res === false) {
        // tslint:disable-next-line: max-line-length
        let titleNoti = "failedToDeleting:Xóa thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
      }
    });
  }

  updateTagsDialog(id) {
    const dialogData = new ConfirmUpdateDialogModel(id);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1000px',
      height: '700px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "";
      if (res != undefined) {
        contentNoti = res?.translate.length > this.numberSubstr ? res?.translate.substr(0, this.numberSubstr) + '...' : res?.translate;
        if (res?.status === true) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thành công" + "!";
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
          this.tagPaginate(this.tagPageIndex, 0);
        }
        if (res?.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thất bại" + "!";

          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  addCPU() {
    const dialogData = new AddCPUConfirmAddDialogModel();
    const dialogRef = this.dialog.open(AddCpuComponent, {
      width: '1000px',
      height: '700px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "";
      if (res != undefined) {
        contentNoti = res.translate;
        if (res.status === true) {
          const totalPage = Math.ceil((this.tagCountResult + 1) / this.tagSize);
          this.tagPage = totalPage;
          this.cpuPaginate(totalPage, 1);
          let titleNoti = "addedSuccessfully:Thêm mới thành công" + "!";
          // tslint:disable-next-line: max-line-length
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
        }
        if (res.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "failedToAdding:Thêm mới thất bại" + "!";
          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  deleteCPUDialog(id, content) {
    let contentNoti = content;
    let dialogTitle = "Xoá CPU"
    let confirmDelete = "Bạn có muốn xóa CPU này ra khỏi danh sách" + ": ";
    let dialogContent = contentNoti;
    const dialogData = new ConfirmationDialogModel(dialogTitle, confirmDelete + dialogContent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      if (res === true) {
        this.cpuService.deleteCPU(id).subscribe(data => {
          this.cpuPaginate(this.tagPageIndex, 0);
          //  tslint:disable-next-line: max-line-length
          let titleNoti = '';
          switch (data?.affectedRows) {
            case 0:
              // Xoa that bai
              titleNoti = "failedToDeleting:Xóa thất bại" + "!";
              this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
              break;
            case 1:
              // Xoa thanh cong
              titleNoti = "deletedSuccessfully:Xóa thành công" + "!";
              this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
              break;
            case -1:
              // Da su dung
              titleNoti = "dataWasUsed:Dữ liệu đã sử dụng" + "!";
              this.snackbarService.openSnackBar(2, titleNoti, contentNoti, 'warn_notification', 2000);
              break;
          }
        }, err => {
        });
      }
      if (res === false) {
        // tslint:disable-next-line: max-line-length
        let titleNoti = "failedToDeleting:Xóa thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
      }
    });
  }

  updateCPUDialog(id) {
    const dialogData = new ConfirmUpdateCPUDialogModel(id);
    const dialogRef = this.dialog.open(UpdateCpuComponent, {
      width: '1000px',
      height: '700px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "";
      if (res != undefined) {
        contentNoti = res?.translate.length > this.numberSubstr ? res?.translate.substr(0, this.numberSubstr) + '...' : res?.translate;
        if (res?.status === true) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thành công" + "!";
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
          this.cpuPaginate(this.tagPageIndex, 0);
        }
        if (res?.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thất bại" + "!";

          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  tagPaginate(event: any, type) {
    switch (type) {
      case 0:
        this.tagPageIndex = event;
        this.tagPage = event;
        const regExp1 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj1 = this.searchForm.getRawValue();
        const searchString1 =
          '?page=' + (this.tagPageIndex - 1) + '&size=' + this.tagSize +
          '&spec=page&keyword=' + formObj1.keyword.replace(regExp1, "").trim();
        this.getTagList(searchString1);
        break;
      case 1:
        this.tagPageIndex = 1;
        this.tagPage = 1;
        const regExp2 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj2 = this.searchForm.getRawValue();
        const searchString2 =
          '?page=' + (this.tagPageIndex - 1) + '&size=' + this.tagSize +
          '&spec=page&keyword=' + formObj2.keyword.replace(regExp2, "").trim();
        this.getTagList(searchString2);
        break;
    }
  }

  cpuPaginate(event: any, type) {
    switch (type) {
      case 0:
        this.cpuPageIndex = event;
        this.cpuPage = event;
        const regExp1 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj1 = this.searchForm.getRawValue();
        const searchString1 =
          '?page=' + (this.cpuPageIndex - 1) + '&size=' + this.cpuSize +
          '&spec=page&keyword=' + formObj1.keyword.replace(regExp1, "").trim();
        this.getCPUList(searchString1);
        break;
      case 1:
        this.cpuPageIndex = 1;
        this.cpuPage = 1;
        const regExp2 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj2 = this.searchForm.getRawValue();
        const searchString2 =
          '?page=' + (this.cpuPageIndex - 1) + '&size=' + this.cpuSize +
          '&spec=page&keyword=' + formObj2.keyword.replace(regExp2, "").trim();
        this.getCPUList(searchString2);
        break;
    }
  }
}
