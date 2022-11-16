import { Component, OnInit } from '@angular/core';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
  ) { }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('product');
  }

}
