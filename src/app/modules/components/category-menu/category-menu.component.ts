import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';



@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  isOpenCategorySubMenu = false
  categorySubMenuData

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  
  setExtendMenuData(category){
    console.log('set extend menu data ' + category)
  }
  openExtendMenu(category){
    // this.categorySubMenuData(category)
    this.isOpenCategorySubMenu = true

  }
  closeExtendMenu(){
    this.isOpenCategorySubMenu = false
  }

  logout(){
    this.authService.logout()
  }

}
