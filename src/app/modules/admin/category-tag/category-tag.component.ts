import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EnvService } from 'src/app/core/service/env.service';
import { CategoryTagService } from 'src/app/data/service/category-tag/category-tag.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { ConfirmationDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
// import { ConfirmationDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/dialogs/comfirm-dialog/comfirm-dialog.component';
import { AddComponent, ConfirmAddDialogModel } from './add/add.component';
import { ConfirmUpdateDialogModel, UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.scss']
})
export class CategoryTagComponent implements OnInit {
  searchForm = new FormGroup({
    keyword: new FormControl(''),
    account: new FormControl(''),
    tag: new FormControl(''),
  });

  
  displayedColumns: string[] = ['stt', 'id', 'symbol', 'title', 'description', 'action'];
  ELEMENTDATA: any[] = [];
  dataSource: MatTableDataSource<any>;

  xpandStatus = false;
  size = 10;
  pageIndex = 1;
  page = 1;
  countResult = 0;
  numberSubstr = 50;
  pgSizeOptions = [5, 10, 15];
  
  paramsQuery = {
    keyword: '',
    page: '1',
    size: '5',
    account: '',
    tag: '',
  };

  constructor(
    private dialog: MatDialog,
    // private envService: EnvService,
    private cdRef: ChangeDetectorRef,
    private snackbarService: SnackbarService,
    private categoryTagService: CategoryTagService,
    // private fileService: FileService,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
  ) { 
    this.dataSource = new MatTableDataSource(this.ELEMENTDATA);
  }

  ngOnInit(): void {
    const searchString = '?page=0&size=10&spec=page&keyword=';
    this.getListCategory(searchString);
  }

  onConfirmSearch() {
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    const formObj = this.searchForm.getRawValue();
    this.pageIndex = 1;
    const searchString =
      '?page=0&size=' + this.size +
      '&spec=page&keyword=' + formObj.keyword.replace(regExp, "").trim();
    this.getListCategory(searchString);
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListCategory(searchString) {
    this.categoryTagService.getListCategory(searchString).subscribe(data => {
      this.ELEMENTDATA = [];
      this.countResult = data.totalElements;
      for (let i = 0; i < data.numberOfElements; i++) {
        data.content[i].stt = this.size * (this.pageIndex - 1) + (i + 1);
        this.ELEMENTDATA.push(data.content[i]);
      }
      this.dataSource.data = this.ELEMENTDATA;
    });
  }

  addCategoryTag() {
    const dialogData = new ConfirmAddDialogModel();
    const dialogRef = this.dialog.open(AddComponent, {
      width: '1000px',
      height: '600px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "Thành công";
      if (res != undefined) {
        // contentNoti = res?.translate.length > this.numberSubstr ? res?.translate.substr(0, this.numberSubstr) + '...' : res?.translate;
        if (res.status === true) {
          const totalPage = Math.ceil((this.countResult + 1) / this.size);
          this.page = totalPage;
          this.paginate(totalPage, 1);
          let titleNoti = "Thêm mới thành công" + "!";
          // tslint:disable-next-line: max-line-length
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
        }
        if (res.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Thêm mới thất bại" + "!";
          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  deleteCategoryTagDialog(id, content) {
    let contentNoti = content;
    let dialogTitle = "Xoá loại nhãn";
    let confirmDelete = "Bạn có muốn xóa loại nhãn này ra khỏi danh sách" + ": ";
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
        this.categoryTagService.deleteCategoryTag(id).subscribe(data => {
          this.paginate(this.pageIndex, 0);
          //  tslint:disable-next-line: max-line-length
          let titleNoti = '';
          switch (data?.affectedRows) {
            case 0:
              // Xoa that bai
              titleNoti = "Xóa thất bại" + "!";
              this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
              break;
            case 1:
              // Xoa thanh cong
              titleNoti = "Xóa thành công" + "!";
              this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
              break;
            case -1:
              // Da su dung
              titleNoti = "Dữ liệu đã sử dụng" + "!";
              this.snackbarService.openSnackBar(2, titleNoti, contentNoti, 'warn_notification', 2000);
              break;
          }
        }, err => {
        });
      }
      if (res === false) {
        // tslint:disable-next-line: max-line-length
        let titleNoti = "Xóa thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
      }
    });
  }

  updateCategoryTagDialog(id) {
    // console.log('aaaaaaaaaaaaaa',id);
    const dialogData = new ConfirmUpdateDialogModel(id);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1000px',
      height: '600px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      let contentNoti = "";
      if (res != undefined) {
        contentNoti = res.translate;
        if (res?.status === true) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thành công" + "!";
          this.snackbarService.openSnackBar(1, titleNoti, contentNoti, 'success_notification', 2000);
          this.paginate(this.pageIndex, 0);
        }
        if (res?.status === false) {
          // tslint:disable-next-line: max-line-length
          let titleNoti = "Cập nhật thất bại" + "!";

          this.snackbarService.openSnackBar(0, titleNoti, contentNoti, 'error_notification', 2000);
        }
      }
    });
  }

  onClickOpenAdvancedSearchBox() {
    this.xpandStatus = this.xpandStatus ? false : true;
  }

  paginate(event: any, type) {
    switch (type) {
      case 0:
        this.pageIndex = event;
        this.page = event;
        const regExp1 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj1 = this.searchForm.getRawValue();
        const searchString1 =
          '?page=' + (this.pageIndex - 1) + '&size=' + this.size +
          '&spec=page&keyword=' + formObj1.keyword.replace(regExp1, "").trim();
        this.getListCategory(searchString1);
        break;
      case 1:
        this.pageIndex = 1;
        this.page = 1;
        const regExp2 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj2 = this.searchForm.getRawValue();
        const searchString2 =
          '?page=' + (this.pageIndex - 1) + '&size=' + this.size +
          '&spec=page&keyword=' + formObj2.keyword.replace(regExp2, "").trim();
        this.getListCategory(searchString2);
        break;
    }
  }
}
