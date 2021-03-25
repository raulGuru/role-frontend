import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | Observable<boolean> | Promise<boolean> {
//     return this.checkLogin();
//   }

//   canLoad(): boolean | Observable<boolean> | Promise<boolean> {
//     //return this.checkLogin();
//   }

//   checkLogin(): boolean {
//     return false;
//   }
// }
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasUrlAccess(segments);
  }

  hasUrlAccess(segments): boolean {
    const access = this.authService.getUserMenu();
    if (!access) {
      this.router.navigate(['/auth']);
    } else {
      if(segments.length > 1) {
        if (access.indexOf(segments[1].path) > -1) {
          return true;
        } else {
          this.router.navigate(['/auth']);
        }
      }
      this.router.navigate(['/auth']);
    }
    return false;
  }
}
