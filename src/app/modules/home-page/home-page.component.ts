import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  smallBannerHeight = '0'

  constructor() { }

  ngOnInit(): void {
    this.smallBannerHeight = this.getSmallBannerHeight()
  }

  getSmallBannerHeight(){
    let item = document.getElementsByClassName('promo-banner-container') as HTMLCollectionOf<HTMLElement>;
    let width = item[1].offsetWidth*24/100*0.5
    return width.toString()+'px'
  }

  

}
