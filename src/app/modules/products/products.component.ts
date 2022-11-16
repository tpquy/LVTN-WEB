import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LaptopService } from 'src/app/data/service/laptop/laptop.service';
import { TagService } from 'src/app/data/service/tag/tag.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterForm = new FormGroup({
    type: new FormControl(''),
    brand: new FormControl(''),
    screen: new FormControl(''),
    ram: new FormControl(''),
    cpu: new FormControl(''),
    vga: new FormControl(''),
    min: new FormControl(0),
    max: new FormControl(200),
  });
  sortBy = 'new';
  listProduct = [];
  listType = [];
  listBrand = [];
  listScreen = [];
  listRam = [];
  listCpu = [];
  listVga = [];
  listPromo = [
    {
      type: 1,
      value: 10,
      listProduct: ['63575528c40dff4d1e0a2bfb', ]
    },
    {
      type: 2,
      value: 1000000,
      listProduct: ['63575759c40dff4d1e0a2c01']
    }
  ];

  constructor(
    private productService: LaptopService,
    private router: Router,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.getAllListTag();
    this.onSearch();
  }

  viewDetail (id) {
    this.router.navigate(['products/product-detail/' + id]);
  }

  getAllListTag () {
    this.getListTag('6350f94a417f2758b415a577', this.listBrand);
    this.getListTag('6354b9a1b58a1079f11b6c6d', this.listCpu);
    this.getListTag('6351008856e3ef1ea8f3523e', this.listRam);
    this.getListTag('6355ded0b63f202f3537eb7a', this.listScreen);
    this.getListTag('6355def5b63f202f3537eb7b', this.listVga);
    this.getListTag('6355df8bb63f202f3537eb7e', this.listType);
  }

  getListTag (category, list) {
    this.tagService.getListTagByCategory(category).subscribe(response => {
      response.content.forEach(element => {
        list.push({
          id: element.id,
          name: element.name.name,
          description: element.name.description
        });
      });
    })
  }


  getSearchString(){
    const formObj = this.filterForm.getRawValue();
    let str = '?keyword=';
    str += '&type=' + formObj.type;
    str += '&brand=' + formObj.brand;
    str += '&screen=' + formObj.screen;
    str += '&ram=' + formObj.ram;
    str += '&cpu=' + formObj.cpu;
    str += '&vga=' + formObj.vga;
    str += '&min=' + formObj.min*1000000;
    str += '&max=' + formObj.max*1000000;
    str += '&sort-by=' + this.sortBy;
    console.log(str);
    return  str;
  }

  onSearch () {
    this.productService.getListLaptop(this. getSearchString()).subscribe(res => {
      console.log('Get list product success!');
      this.listProduct = [];
      res.content.forEach(item => {
        let discount = this.getPromo(item.id, item.price);
        let tmpProduct = {
          id: item.id,
          name: item.name,
          brand: item.brand.name.name,
          price: this.formatPrice(item.price) + ' đ',
          priceAfterDiscount: discount.priceAfterDiscount,
          discount: discount.discount,
          saved: discount.saved
        }
        this.listProduct.push(tmpProduct);
      })
    }, (err) => console.log('Get list product fail!'));
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

  getPromo (id, price) {
    let promotion = {
      discount: '',
      saved: '',
      priceAfterDiscount: ''
    }
    this.listPromo.forEach(promo => {
      if (promo.listProduct.includes(id)) {
        if (promo.type == 1) {
          promotion = {
            discount: '-' + promo.value + '%',
            saved: this.formatPrice(price*promo.value/100) + ' đ',
            priceAfterDiscount: this.formatPrice(price - price*promo.value/100) + ' đ'
          }
        } else {
          promotion = {
            discount: '-' + promo.value + 'đ',
            saved: this.formatPrice(promo.value) + ' đ',
            priceAfterDiscount: this.formatPrice(price - promo.value) + ' đ'
          }
        }
      }
    });
    return promotion;
    
  }


}
