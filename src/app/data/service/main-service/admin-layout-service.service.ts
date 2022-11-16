import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutServiceService {

  listMenuItem = ['dashboard', 'order', 'product', 'staff', 'user', 'account'];
  constructor() { }

  focusMenu(id){
    // setTimeout(() => {
    //   this.listMenuItem.forEach(item => {
    //     document.getElementById(item).classList.remove('menu-focused');
    //     document.getElementById(item).classList.add('menu-not-focused');
    //   })
    // document.getElementById(id).classList.remove('menu-not-focused');
    // document.getElementById(id).classList.add('menu-focused');
  
    // }, 100);
  }

}
