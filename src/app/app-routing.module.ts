import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'env/environment';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('modules/home/home.module').then(m => m.HomeModule) },    
  
  { path: '', loadChildren: () => import('modules/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'home', loadChildren: () => import('modules/home-page/home-page.module').then(m => m.HomePageModule) },  
  { path: 'products', loadChildren: () => import('modules/products/products.module').then(m => m.ProductsModule) }, 
  // { path: 'products/product-detail', loadChildren: () => import('src/app/modules/products/pages/product-detail/product-detail.module').then(m => m.ProductDetailModule) }, 
  { path: 'login', loadChildren: () => import('modules/login/login.module').then(m => m.LoginModule) },
  { path: 'authenticate', loadChildren: () => import('modules/quy-login/quy-login.module').then(m => m.QuyLoginModule) },
  { path: 'nofi', loadChildren: () => import('modules/nofi/nofi.module').then(m => m.NofiModule) },
  { path: 'cart', loadChildren: () => import('modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'news', loadChildren: () => import('modules/news/news.module').then(m => m.NewsModule) },
  { path: 'account', loadChildren: () => import('modules/account/account.module').then(m => m.AccountModule)},

  //admin
  // { path: '', loadChildren: () => import('modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'admin', loadChildren: () => import('modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { roles: ['webAdmin', ]} },
  { path: 'admin/dashboard', loadChildren: () => import('modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard], data: { roles: ['webAdmin', ]} },
  { path: 'admin/account-management', loadChildren: () => import('modules/admin/account/account.module').then(m => m.AccountModule)},
  { path: 'admin/order-management', loadChildren: () => import('modules/admin/manage-order/manage-order.module').then(m => m.ManageOrderModule) },
  { path: 'admin/order-management/order-detail', loadChildren: () => import('modules/admin/manage-order/order-detail/order-detail.module').then(m => m.OrderDetailModule) },
  { path: 'admin/product-management', loadChildren: () => import('modules/admin/manage-product/manage-product.module').then(m => m.ManageProductModule) },
  { path: 'admin/product-management/detail', loadChildren: () => import('modules/admin/manage-product/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
  { path: 'admin/product-management/add-new', loadChildren: () => import('modules/admin/manage-product/add-new-product/add-new-product.module').then(m => m.AddNewProductModule) },
  { path: 'admin/product-management/update', loadChildren: () => import('modules/admin/manage-product/update-product/update-product.module').then(m => m.UpdateProductModule) },
  { path: 'admin/staff-management', loadChildren: () => import('modules/admin/manage-staff/manage-staff.module').then(m => m.ManageStaffModule)  },
  { path: 'admin/staff-management/detail', loadChildren: () => import('modules/admin/manage-staff/staff-detail/staff-detail.module').then(m => m.StaffDetailModule) },
  { path: 'admin/user-management', loadChildren: () => import('modules/admin/manage-user/manage-user.module').then(m => m.ManageUserModule) },
  { path: 'admin/category-tag', loadChildren: () => import('modules/admin/category-tag/category-tag.module').then(m => m.CategoryTagModule) },
  { path: 'admin/tag', loadChildren: () => import('modules/admin/tag/tag.module').then(m => m.TagModule) },

  //account
  { path: 'account/profile', loadChildren: () => import('modules/account/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'account/order', loadChildren: () => import('modules/account/order/order.module').then(m => m.OrderModule) },
  { path: 'account/order/order-detail', loadChildren: () => import('modules/account/order/order-detail/order-detail.module').then(m => m.OrderDetailModule) },
  { path: 'account/address', loadChildren: () => import('modules/account/list-address/list-address.module').then(m => m.ListAddressModule) },

  { path: 'error', loadChildren: () => import('modules/error/error.module').then(m => m.ErrorModule) },
  { path: 'error/not-permission', loadChildren: () => import('modules/error/pages/insufficient-permission/insufficient-permission.module').then(m => m.InsufficientPermissionModule) },
  { path: 'tag', loadChildren: () => import('modules/tag/tag.module').then(m => m.TagModule) },
  { path: 'file', loadChildren: () => import('modules/file/file.module').then(m => m.FileModule) },
  { path: '**', redirectTo: 'error/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, environment.routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
