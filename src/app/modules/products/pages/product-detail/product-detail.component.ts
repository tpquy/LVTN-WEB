import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaptopService } from 'src/app/data/service/laptop/laptop.service';

export interface ProductImage {
  no: number,
  url: string,
  description: ''
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId = '';
  productCode = '';
  productName = '';
  productBrand = '';
  productPrice = '';
  productPriceAfterDiscount = '';
  productDiscount = '';
  productSaved = '';
  productCpu = {
    name: '',
    base: '',
    boost: '',
    core: '',
    thread: ''
  };
  productVga = {
    name: '',
    desc: ''
  };
  productMaterial = '';
  productOs = '';
  productScreen = '';
  productWeight = '';
  productSold = 0;
  productQuantity = 0;
  productType = '';
  productRam = '';

  promo = {
    type: 1,
    value: 10,
    expired: '01/01/2022'
  };

  listProductImage: ProductImage[]
  selectedImage: string;
  selectedImageId: string;

  arrayStar = [
    {
      hasStar: true,
      isHalf: false,
    },
    {
      hasStar: true,
      isHalf: false,
    },
    {
      hasStar: true,
      isHalf: false,
    },
    {
      hasStar: true,
      isHalf: false,
    },
    {
      hasStar: true,
      isHalf: true,
    },
  ];

  totalFeedback = 10;

  feedbackRating = {
    star: [true, false, false, false, false],
    point: 0
  }

  showFeedbackForm = false;
  showCommentForm = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: LaptopService
  ) {
    this.productId = this.activeRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.setProductInfo();
    this.setProductImage();
  }


  setProductInfo () {
    this.productService.getDetailLaptop(this.productId).subscribe(res => {
      this.productName = res.name;
      this.productCode = res.code;
      this.productPrice = this.formatPrice(res.price) + ' đ';
      this.setPromo(res.price);
      this.productCpu = {
        name: res.cpu.name,
        base: res.cpu.baseClock,
        boost: res.cpu.boostClock,
        core: res.cpu.coreNumber,
        thread: res.cpu.threadNumber
      };
      this.productVga = {
        name: res.graphicsCard.name.name,
        desc: res.graphicsCard.description
      };
      this.productMaterial = res.material.name.name;
      this.productOs = res.os.name.name;
      this.productScreen = res.screen.name.name;
      this.productWeight = res.weight;
      this.productSold = res.sold;
      this.productQuantity = res.quantity;
      this.productType = res.type.name.name
      this.productRam = res.ram.name.name

    }, (err) => console.log('Get product detail fail!'));
  }

  setProductImageSize(){
    console.log(document.getElementById('product-image').offsetHeight + '----' +  document.getElementById('product-image').offsetWidth + 'px')
    document.getElementById('product-image').style.height = document.getElementById('product-image').offsetWidth + 'px'
    console.log(document.getElementById('product-image').offsetHeight)
  }
  
  selectProductImage(no, url){
    this.selectedImage = url;
    
    for(let i=0; i<this.listProductImage.length; i++){
      document.getElementById('product-image-'+(i+1)).classList.remove('selected-product-image')
    }
    document.getElementById('product-image-'+no).classList.add('selected-product-image')
  }

  setProductImage(){

    // giả bộ gọi api các thứ các thứ

    this.listProductImage = [
      {
        no: 1,
        url: '../../../../../assets/img/Product/phone-1-a.webp',
        description: ''
      },
      {
        no: 2,
        url: '../../../../../assets/img/Product/phone-1-b.webp',
        description: ''
      },
      {
        no: 3,
        url: '../../../../../assets/img/Product/phone-1-c.webp',
        description: ''
      },
      {
        no: 4,
        url: '../../../../../assets/img/Product/phone-1-d.webp',
        description: ''
      }
    ]
    this.selectedImage = this.listProductImage[0].url

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

  setPromo (price) {
    if (this.promo != null) {
      if (this.promo.type == 1) {
        this.productDiscount = '-' + this.promo.value + '%',
        this.productSaved = this.formatPrice(price*this.promo.value/100) + ' đ',
        this.productPriceAfterDiscount = this.formatPrice(price - price*this.promo.value/100) + ' đ'
      } else {
        this.productDiscount = '-' + this.promo.value + 'đ',
        this.productSaved = this.formatPrice(this.promo.value) + ' đ',
        this.productPriceAfterDiscount = this.formatPrice(price - this.promo.value) + ' đ'
      }
    } 
  }

  setFeedbackRating (star) {
    star += 1;
    for(let i=0; i<5; i++) {
      this.feedbackRating.star[i] = i<star ? true : false;
    }
  }

  showForm(form){
    switch (form) {
      case 'feedback':
        this.showCommentForm = false;
        this.showFeedbackForm = this.showFeedbackForm ? false : true;
        break;
    
      case 'comment':
        this.showFeedbackForm = false;
        this.showCommentForm = this.showCommentForm ? false : true;
        break;
    }
  }

}
