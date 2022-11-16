import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export interface Menu {
  id: string,
  icon: string,
  name: string,
  roting: string,
  permission: string,
  isActive: string,
}
@Component({
  selector: 'app-admin-layout-nav',
  templateUrl: './admin-layout-nav.component.html',
  styleUrls: ['./admin-layout-nav.component.scss']
})
export class AdminLayoutNavComponent implements OnInit {
  role = localStorage.getItem('role');
  menu = [
    {
      id: 'dashboard',
      icon: 'dashboard',
      name: ' Dashboard',
      routing: '/admin/dashboard',
      permission: ['superAdmin', 'webAdmin', 'user'],
      isActive: true
    },
    {
      id: 'order',
      icon: 'list_alt',
      name: 'Đơn hàng',
      routing: '/admin/order-management',
      permission: ['superAdmin', 'webAdmin', 'user'],
      isActive: false
    },
    {
      id: 'product',
      icon: 'manage_search',
      name: 'Sản phẩm',
      routing: '/admin/product-management',
      permission: ['superAdmin', 'webAdmin', 'user']
    },
    {
      id: 'staff',
      icon: 'badge',
      name: 'Nhân viên',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/admin/staff-management',
      isActive: false
    },
    {
      id: 'user',
      icon: 'group',
      name: 'Người dùng',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/admin/user-management',
      isActive: false
    },
    {
      id: 'account',
      icon: 'person',
      name: 'Tài khoản',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/admin/account-management',
      isActive: false
    },
    {
      id: 'categoryTag',
      icon: 'person',
      name: 'Danh mục loại nhãn',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/admin/category-tag',
      isActive: false
    },
    {
      id: 'tag',
      icon: 'person',
      name: 'Danh mục nhãn',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/admin/tag',
      isActive: false
    },
    {
      id: 'account',
      icon: 'person',
      name: 'Trang chủ',
      permission: ['superAdmin', 'webAdmin', 'user'],
      routing: '/',
      isActive: false
    }
  ]

  constructor(
    
  ) { 

  }

  ngOnInit(): void {

  }

  checkPermission (listPermission: string[], role) {
    return listPermission.includes(role);
  }

  getURL (name) {
    let url = window.location.href;
    let result = url.indexOf(name);
    // console.log(result)
    return result>=0;
  }

}
