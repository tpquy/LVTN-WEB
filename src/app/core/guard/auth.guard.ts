import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, UrlTree, Route } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { EnvService } from '../service/env.service';
import { PermissionClaim } from 'src/app/data/schema/oidc/token/permission-claim';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

const loggedInUser = {
  id: 'user',
  name: 'Test User',
  role: 'user'
 }
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  role = localStorage.getItem('role');

  // inject the router service to allow navigation.
  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const expectedRole = route.data.roles;
    // return true if user role is not expectedRole
    var notRole = (!expectedRole.includes(this.role));

    // Redirect to login page if the user is not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['authenticate']);
      return false;
    }
    // Alarm when user is not granted to access the resource
    else if (notRole) {
      this.router.navigate(['/error/not-permission']);
      return false;
    }
    return true;
  }  
 }

// export class AuthGuard extends KeycloakAuthGuard {

//   constructor(protected router: Router, protected keycloakAngular: KeycloakService, private envService: EnvService) {
//     super(router, keycloakAngular);
//   }

//   isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
//     let config = this.envService.getConfig();
//     return new Promise((resolve, reject) => {

//       if (!this.authenticated) {
//         this.keycloakAngular.login().catch(e => console.error(e));
//         return reject(false);
//       }

//       //check required roles
//       const roles: string[] = route.data.roles;
//       if (roles && roles.length > 0) {
//         if (!this.roles || this.roles.length === 0) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//         if (roles.some(role => this.roles.indexOf(role) === -1)) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//       }

//       //check required any roles
//       const anyRoles: string[] = route.data.anyRoles;
//       if (anyRoles && anyRoles.length > 0) {
//         if (!this.roles || this.roles.length === 0) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//         if (anyRoles.every(role => this.roles.indexOf(role) === -1)) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//       }

//       let grantedPermissions: PermissionClaim[] = [];
//       let token = <any> this.keycloakAngular.getKeycloakInstance().tokenParsed;
//       if (token && token.permissions && token.permissions instanceof Array) {
//         grantedPermissions = token.permissions;
//       }
      
//       //check required permissions
//       const permissions: string[] = route.data.permissions;
//       if (permissions && permissions.length > 0) {
//         if (grantedPermissions.length === 0) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//         if (permissions.some(p => grantedPermissions.every(gp => gp.permission.code !== p))) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//       }
      
//       //check required any permissions
//       const anyPermissions: string[] = route.data.anyPermissions;
//       if (anyPermissions && anyPermissions.length > 0) {
//         if (grantedPermissions.length === 0) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//         if (anyPermissions.every(p => grantedPermissions.every(gp => gp.permission.code !== p))) {
//           this.router.navigate([config.insufficientPermissionRouterLink]);
//           return resolve(false);
//         }
//       }

//       return resolve(true);
//     });
//   }

// }
