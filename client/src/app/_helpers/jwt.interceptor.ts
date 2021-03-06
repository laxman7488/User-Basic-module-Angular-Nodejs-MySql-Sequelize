import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let sessionUser = this.authenticationService.sessionUserValue;
        if (sessionUser && sessionUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${sessionUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}