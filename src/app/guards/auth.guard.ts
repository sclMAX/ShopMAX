import { UserService } from './../services/user.service';
import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>|
      Promise<boolean>| boolean {
    return this.userService.user.pipe(take(1), map(user => {
                                        if (user) {
                                          return true;
                                        } else {
                                          this.router.navigate(['login']);
                                          return false;
                                        }
                                      }));
  }
}
