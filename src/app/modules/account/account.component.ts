import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getCurrentUrl();
  }

  getCurrentUrl(){
    let url = window.location.href;
    if(url.indexOf('account/address') != -1){
      this.accountFocus('account-address');
    } else if (url.indexOf('account/order') != -1) {
      this.accountFocus('account-order');
    } else {
      this.accountFocus('account-profile');
    }
  }

  accountFocus(id) {
    setTimeout(() => {
      document.getElementById('account-profile').classList.remove('menu-active');
      document.getElementById('account-order').classList.remove('menu-active');
      document.getElementById('account-address').classList.remove('menu-active');
      document.getElementById(id).classList.add('menu-active');
    }, 10);
  }

}
