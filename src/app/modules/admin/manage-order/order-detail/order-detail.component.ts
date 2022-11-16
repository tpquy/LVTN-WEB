import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';
import { OrderService } from 'src/app/data/service/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  statusList = [
    {code: 'all', name: 'Tất cả'},
    {code: 'order', name: 'Vừa đặt hàng'},
    {code: 'confirm', name: 'Xác nhận'},
    {code: 'transport', name: 'Vận chuyển'},
    {code: 'receive', name: 'Đã nhận hàng'},
    {code: 'cancel', name: 'Đã hủy'},
  ];

  orderId: any;

  // user info
  uid: ""
  ufullName: ""
  uemail: ""
  uaddress: ""
  uphoneNumber: ""

  // shipper info
  sid: ""
  sfullName: ""
  semail: ""
  saddress: ""
  sphoneNumber: ""

  // order info
  createdDate: any;
  total: any; // Gia sau khi giam
  itemPriceTotal: any; // Gia truoc giam
  discountTotal: any; // Tong khuyen mai
  products: any[];
  orderStatuses: any[];

  newestStatus: string;

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
  ) {
    this.orderId = this.activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.setOrderInfo();
    // setTimeout(() => {
    //   this.adminLayoutServiceService.focusMenu('order');
    // }, 10);
  }

  setOrderInfo() {
    this.orderService.getDetailOrder(this.orderId).subscribe(res => {
      if (res != null && res != "") {
        this.sid = res.shipper.id;
        this.sfullName = res.shipper.fullName;
        this.semail = res.shipper.email;
        this.saddress = res.shipper.address;
        this.products = res.products;
        this.orderStatuses = res.orderStatuses;
        this.newestStatus = this.orderStatuses[this.orderStatuses.length -1].code;
        this.createdDate = res.orderStatuses[0].timeUpdate;
        this.total = this.totalPricingCalculate(res.products);

        if (res.staff != null && res.staff != "") {
          this.authService.getDetailUser(res.staff.id).subscribe(res2 => {
            this.uid = res2.id;
            this.ufullName = res2.fullName;
            this.uemail = res2.email;
            this.uaddress = res2.address;
          }, (err) => console.log('Get user detail fail!'));
        }
      }
    }, (err) => console.log('Get Order detail fail!'));
  }

  formatPrice(price: number) {
    let tmp = price + '';
    let listString = [];
    let result = '';
    let start = tmp.length % 3;

    if (start > 0) {
      listString.push(tmp.substring(0, start));
    }
    while (start < tmp.length) {
      listString.push(tmp.substring(start, start + 3));
      start += 3;
    }
    listString.forEach(str => {
      result = result + '.' + str;
    })
    return result.substring(1, result.length);
  }

  itemPricingCalculate(item) {
    let total = 0;
    if (item) {
      let promoType = item.promo.type;
      let promoValue = item.promo.value;
      let itemPrice = item.product.price;
      let quantity = item.itemQuantity;
      // let itemPrice = (productPrice * quantity);
      if (promoType == 1) {
        // Phan tram
        itemPrice = itemPrice * (100 - promoValue) / 100;
      } else {
        itemPrice = itemPrice - promoValue;
      }
      total = total + itemPrice;

    }
    return this.formatPrice(total);
  }

  totalPricingCalculate(array: any) {
    let total = 0;
    let itemTotal = 0;
    let discountPriceTotal = 0;
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        let promoType = array[i].promo.type;
        let promoValue = array[i].promo.value;
        let productPrice = array[i].product.price;
        let quantity = array[i].itemQuantity;
        let itemPrice = (productPrice * quantity);
        let discountPrice = 0;

        if (promoType == 1) {
          // Phan tram
          itemPrice = itemPrice * (100 - promoValue) / 100;
          discountPrice =  (productPrice * quantity) - itemPrice;
        } else {
          itemPrice = itemPrice - promoValue;
          discountPrice =  promoValue;
        }
        total = total + itemPrice;
        itemTotal = itemTotal + (productPrice * quantity);
        discountPriceTotal = discountPriceTotal + discountPrice
      }
    }
    this.itemPriceTotal = itemTotal;
    this.discountTotal = discountPriceTotal;
    return this.formatPrice(total);
  }

  getFilePath(fileList) {
    if (fileList.length > 0) {
      return 'http://localhost:8080/file/download/' + fileList[0].newFilename;
    }
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

}
