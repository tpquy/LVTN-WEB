import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { OrderService } from 'src/app/data/service/order/order.service';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { ConfirmationDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';

export interface Order {
  code: string;
  orderDate: string;
  products: string[];
  price: string;
  status: string;
}

const STATUS_LIST = [
  {code: 'all', name: 'Tất cả', content: ''},
  {code: 'order', name: 'Vừa đặt hàng', content: 'Đặt hàng thành công'},
  {code: 'confirm', name: 'Xác nhận', content: 'Đơn hàng đã được xác nhận'},
  {code: 'transport', name: 'Vận chuyển', content: 'Đơn hàng đang được vận chuyển'},
  {code: 'receive', name: 'Đã nhận hàng', content: 'Đã nhận hàng'},
  {code: 'cancel', name: 'Đã hủy', content: 'Đơn hàng đã được huỷ'},
];

// 1-3: Đã đặt hàng, 4-6: Đang giao hàng, 7,8,-1: Đã hoàn thành

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  tabActive = '0';
  countAll = 1;
  countOrdered = 1;
  countShipping = 1;
  countDone = 1;

  displayedColumns: string[] = ['code', 'orderDate', 'products', 'price', 'status', 'action'];

  ELEMENT_DATA_0: any[] = [];
  ELEMENT_DATA_1: any[] = [];
  ELEMENT_DATA_2: any[] = [];
  ELEMENT_DATA_3: any[] = [];

  dataSource_0: MatTableDataSource<any>;
  dataSource_1: MatTableDataSource<any>;
  dataSource_2: MatTableDataSource<any>;
  dataSource_3: MatTableDataSource<any>;
  
  statusList = STATUS_LIST;

  searchForm = new FormGroup ({
    code: new FormControl(''),
    status: new FormControl(''),
    isMine: new FormControl(''),
  });



  constructor(
    private dialog: MatDialog,
    private adminLayoutServiceService: AdminLayoutServiceService,
    private orderService: OrderService,
    private router: Router,
    private snackbarService: SnackbarService

  ) {
    this.dataSource_0 = new MatTableDataSource(this.ELEMENT_DATA_0);
    this.dataSource_1 = new MatTableDataSource(this.ELEMENT_DATA_1);
    this.dataSource_2 = new MatTableDataSource(this.ELEMENT_DATA_2);
    this.dataSource_3 = new MatTableDataSource(this.ELEMENT_DATA_3);

  }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('order');
    this.activeTab('0');
    const searchString = '?page=0&size=10&spec=page&keyword=';
    this.getListOrder(searchString);
  }

  
  // Chọn tab hiển thị đơn hàng -- start
  activeTab(id){
    const searchString = '?page=0&size=10&spec=page&keyword=';
    this.getListOrder(searchString);
    setTimeout(() => {
      if(id == this.tabActive){
        this.showTab(0);
        this.tabActive = '0'
      } else {
        this.showTab(id);
        this.tabActive = id
      } 
    }, 10); 
  }

  hideTab(){
    console.log('tab-' + this.tabActive)
    document.getElementById('tab-' + this.tabActive).style.display = 'none';
    if(this.tabActive != '0'){
      document.getElementById('tab-button-' + this.tabActive).classList.remove('filt-button-active');
    }
  }
  showTab(id){
    this.hideTab()
    document.getElementById('tab-' + id).style.display = 'flex';
    if(id != '0') {
      document.getElementById('tab-button-' + id).classList.add('filt-button-active');
    }
  }
  // Chọn tab hiển thị đơn hàng -- end

  onConfirmSearch () {
    
  }

  getListOrder(searchString) {
    this.orderService.getListOrder(searchString).subscribe(data => {
      this.ELEMENT_DATA_0 = [];
      this.ELEMENT_DATA_1 = [];
      this.ELEMENT_DATA_2 = [];
      this.ELEMENT_DATA_3 = [];
      
      this.countAll = data.length;
      for (let i = 0; i < data.length; i++) {
        data[i].stt = (i + 1);
        this.ELEMENT_DATA_0.push(data[i]);

        if (data[i].orderStatuses[data[i].orderStatuses.length - 1].code == "confirm") {
          this.ELEMENT_DATA_1.push(data[i]);
        } else if (data[i].orderStatuses[data[i].orderStatuses.length - 1].code == "transport") {
          this.ELEMENT_DATA_2.push(data[i]);
        } else if (data[i].orderStatuses[data[i].orderStatuses.length - 1].code == "receive") {
          this.ELEMENT_DATA_3.push(data[i]);
        }
      }
      if (this.ELEMENT_DATA_1.length == 0) {
        this.countOrdered = 0;
      } 
      if (this.ELEMENT_DATA_2.length == 0) {
        this.countShipping = 0;
      } 
      if (this.ELEMENT_DATA_3.length == 0) {
        this.countDone = 0;
      } 
      this.dataSource_0.data = this.ELEMENT_DATA_0;
      this.dataSource_1.data = this.ELEMENT_DATA_1;
      this.dataSource_2.data = this.ELEMENT_DATA_2;
      this.dataSource_3.data = this.ELEMENT_DATA_3;
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

  pricingCalculate(array: any) {
    let total = 0;
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        let promoType = array[i].promo.type;
        let promoValue = array[i].promo.value;
        let productPrice = array[i].product.price;
        let quantity = array[i].itemQuantity;
        let itemPrice = (productPrice*quantity);
        if (promoType == 1) {
          // Phan tram
          itemPrice = itemPrice*(100 - promoValue)/100;
        } else {
          itemPrice = itemPrice - promoValue;
        }
        total = total + itemPrice;
      }
    }
    return this.formatPrice(total);
  }

  viewDetail (id) {
    this.router.navigate(['/admin/order-management/order-detail/' + id]);
    // /admin/order-management/order-detail
  }

  getOrderStatus(status) {
    if (status) {
      for(let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].code === status) {
          return this.statusList[i].name;
        }
      }
    }
    return "Không xác định"
  }

  changeStatusDialog(id, content) {
    let dialogTitle = "Chuyển trạng thái cho đơn hàng";
    let dialogContent = "Bạn có muốn chuyển đơn hàng: " + id + " sang trạng thái " + this.getOrderStatus(content);
    let statusElement = this.statusList.find((element, index) => {
      return element.code === content;
    })

    const dialogData = new ConfirmationDialogModel(dialogTitle, dialogContent);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const res = dialogResult;
      if (res === true) {
        const resultJson = JSON.stringify(statusElement, null, 2);
        this.orderService.addStatus(id, resultJson).subscribe(data => {
          // this.paginate(this.pageIndex, 0);
          let titleNoti = '';
          switch (data?.affectedRows) {
            case 0:
              // Xoa that bai
              titleNoti = "Cập nhật trạng thái thất bại" + "!";
              this.snackbarService.openSnackBar(0, titleNoti, id, 'error_notification', 2000);
              break;
            case 1:
              // Xoa thanh cong
              titleNoti = "Cập nhật trạng thái thành công" + "!";
              this.snackbarService.openSnackBar(1, titleNoti, id, 'success_notification', 2000);
              const searchString = '?page=0&size=10&spec=page&keyword=';
              this.getListOrder(searchString);
              break;
            case -1:
              // Da su dung
              titleNoti = "Dữ liệu đã sử dụng" + "!";
              this.snackbarService.openSnackBar(2, titleNoti, id, 'warn_notification', 2000);
              break;
          }
        }, err => {
        });
      }
      if (res === false) {
        // tslint:disable-next-line: max-line-length
        let titleNoti = "Cập nhật thất bại" + "!";
        this.snackbarService.openSnackBar(0, titleNoti, id, 'error_notification', 2000);
      }
    });
  }
  
}
