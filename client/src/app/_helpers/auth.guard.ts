﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const sessionUser = this.authenticationService.sessionUserValue;
        if (sessionUser) {
            // authorised so return true
            return true;
        }

        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}