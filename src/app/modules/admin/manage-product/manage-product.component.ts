import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LaptopService } from 'src/app/data/service/laptop/laptop.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { ConfirmationDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AddNewProductComponent, AddProductConfirmAddDialogModel } from './add-new-product/add-new-product.component';
import { ConfirmUpdateDialogModel, UpdateProductComponent } from './update-product/update-product.component';

// export interface Product {
//   id: string,
//   code: string,
//   name: string,
//   amount: number,
//   sold: number,
//   cost: string,
//   price: string
//   type: string
// }

// const ELEMENT_DATA: Product[] = [
//   {id: 'asd212a1sd21as', code: 'LAPTOP12312', name: 'Màn hình LCD PHILIPS 242M8 (1920 x 1080/IPS/144Hz/1 ms/FreeSync)', amount: 100, sold: 25, cost: '600.000', type: 'Điện thoại', price: '500.000'},
//   {id: 'asd212a1sd21as', code: 'LAPTOP12312', name: 'Màn hình LCD PHILIPS 242M8 (1920 x 1080/IPS/144Hz/1 ms/FreeSync)', amount: 100, sold: 25, cost: '600.000', type: 'Điện thoại', price: '500.000'},
//   {id: 'asd212a1sd21as', code: 'LAPTOP12312', name: 'Màn hình LCD PHILIPS 242M8 (1920 x 1080/IPS/144Hz/1 ms/FreeSync)', amount: 100, sold: 25, cost: '600.000', type: 'Điện thoại', price: '500.000'},
//   {id: 'asd212a1sd21as', code: 'LAPTOP12312', name: 'Màn hình LCD PHILIPS 242M8 (1920 x 1080/IPS/144Hz/1 ms/FreeSync)', amount: 100, sold: 25, cost: '600.000', type: 'Điện thoại', price: '500.000'},
//   {id: 'asd212a1sd21as', code: 'LAPTOP12312', name: 'Màn hình LCD PHILIPS 242M8 (1920 x 1080/IPS/144Hz/1 ms/FreeSync)', amount: 100, sold: 25, cost: '600.000', type: 'Điện thoại', price: '500.000'},
// ];

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  searchForm = new FormGroup({
    code: new FormControl(''),
    status: new FormControl(''),
    keyword: new FormControl(''),
  });

  displayedColumns: string[] = ['stt', 'name', 'type', 'price', 'amount', 'action'];
  ELEMENTDATA: any[] = [];
  dataSource: MatTableDataSource<any>;

  xpandStatus = false;
  size = 10;
  pageIndex = 1;
  page = 1;
  countResult = 0;
  numberSubstr = 50;
  pgSizeOptions = [1, 5, 10, 15];


  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    // private dialog: MatDialog,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private laptopService: LaptopService,
  ) {
    this.dataSource = new MatTableDataSource(this.ELEMENTDATA);
  }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('product');
    const searchString = '?page=0&size=10&spec=page&keyword=&type=&brand=&screen=&ram=&cpu=&vga=&min=0&max=200000000&sort-by=new';
    
    this.getLaptopList(searchString);
  }

  getLaptopList(searchString) {
    this.laptopService.getListLaptopAdmin(searchString).subscribe(data => {
      this.ELEMENTDATA = [];
      this.countResult = data.totalElements;
      for (let i = 0; i < data.numberOfElements; i++) {
        data.content[i].stt = this.size * (this.pageIndex - 1) + (i + 1);
        this.ELEMENTDATA.push(data.content[i]);
      }
      this.dataSource.data = this.ELEMENTDATA;
    });
    console.log(this.ELEMENTDATA)
  }
  
  onConfirmSearch() {
    const regExp = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
    const formObj = this.searchForm.getRawValue();
    this.pageIndex = 1;
    const searchString =
      '?page=0&size=' + this.size +
      '&spec=page&keyword=' + formObj.keyword.replace(regExp, "").trim() + '&sort-by=new';
    this.getLaptopList(searchString);
  }

  getFilePath(fileList) {
    if (fileList.length > 0) {
      return 'http://localhost:8080/file/download/' + fileList[0].newFilename;
    }
  }

  addProduct() {
    const dialogData = new AddProductConfirmAddDialogModel();
    const dialogRef = this.dialog.open(AddNewProductComponent, {
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
        this.laptopService.deleteLaptop(id).subscribe(data => {
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
    const dialogRef = this.dialog.open(UpdateProductComponent, {
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

  formatPrice (price: number) {
    let tmp = price + '';
    let listString = [];
    let result = '';
    let start = tmp.length%3;

    if (start > 0) {
      listString.push(tmp.substring(0, start));
    }
    while (start < tmp.length) {
      listString.push(tmp.substring(start, start+3));
      start += 3;
    }
    listString.forEach(str => {
      result = result + '.' + str;
    })
    return result.substring(1, result.length);
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
          '&spec=page&keyword=' + formObj1.keyword.replace(regExp1, "").trim() + '&sort-by=new';
        this.getLaptopList(searchString1);
        break;
      case 1:
        this.pageIndex = 1;
        this.page = 1;
        const regExp2 = new RegExp("/[*+?^${}()|[\]\\/<>@;!#%^&:~='_`]/g");
        const formObj2 = this.searchForm.getRawValue();
        const searchString2 =
          '?page=' + (this.pageIndex - 1) + '&size=' + this.size +
          '&spec=page&keyword=' + formObj2.keyword.replace(regExp2, "").trim() + '&sort-by=new';
        this.getLaptopList(searchString2);
        break;
    }
  }
}
