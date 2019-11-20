import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) {}

    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
        let flag = true;

        return this.userService.isAuthenticated().pipe(
          map(authenticated => {
            console.log(authenticated);
            if (!authenticated){
              console.log(authenticated);
              this.snackBar.open('Log in First', 'OK', {
                duration:3000
              });
              flag = false;
              this.router.navigate(['/log-in']);
            }
          }), map(() => flag)
        );
      }

}
