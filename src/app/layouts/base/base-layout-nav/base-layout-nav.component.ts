import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base-layout-nav',
  templateUrl: './base-layout-nav.component.html',
  styleUrls: ['./base-layout-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaseLayoutNavComponent implements OnInit {

  scroll = 0
  screenHeight = window.screen.height;
  isOpenCategoryMenu = false

  cartCounter = 1;
  notifyCounter = 1;

  constructor() { }

  ngOnInit(): void {
  }




  //--------------         -------------------------------------

  @HostListener("document:scroll")
  scrollFunc(){
    this.scroll = document.documentElement.scrollTop
    if(this.scroll > 98){
      document.getElementById('layout-nav').classList.add('fixed')
    }else{
      document.getElementById('layout-nav').classList.remove('fixed')
      this.isOpenCategoryMenu = false
    }
    
  }

  clickCategoryMenu(){
    if(this.isOpenCategoryMenu == true){
      this.isOpenCategoryMenu = false
    }else{
      this.isOpenCategoryMenu = true
    }
  }

  scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  //-------------------------------------

}
