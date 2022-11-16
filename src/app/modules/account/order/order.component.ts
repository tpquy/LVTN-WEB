import { Component, OnInit } from '@angular/core';

export interface Order {
  code: string;
  orderDate: string;
  products: string[];
  price: string;
  status: string;
}

const ELEMENT_DATA_0: Order[] = [
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
];
const ELEMENT_DATA_1: Order[] = [
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
];
const ELEMENT_DATA_2: Order[] = [
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
];
const ELEMENT_DATA_3: Order[] = [
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
  {code: '12312', orderDate: '02/08/2000', products: ['sản phẩm 1', 'sản phẩm 2'], price: '100.000', status: '1'},
];

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabActive = '0';
  countAll = 1;
  countOrdered = 1;
  countShipping = 1;
  countDone = 1;

  displayedColumns: string[] = ['code', 'orderDate', 'products', 'price', 'status'];
  dataSource_0 = ELEMENT_DATA_0;
  dataSource_1 = ELEMENT_DATA_1;
  dataSource_2 = ELEMENT_DATA_2;
  dataSource_3 = ELEMENT_DATA_3;
  

  constructor() { }

  ngOnInit(): void {
    this.activeTab('0');
  }


  // Chọn tab hiển thị đơn hàng -- start
  activeTab(id){
    if(id == this.tabActive){
      this.showTab(0);
      this.tabActive = '0'
    } else {
      this.showTab(id);
      this.tabActive = id
    }  
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

}
