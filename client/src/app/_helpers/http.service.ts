import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
        let baseUrl = `http://localhost:8084/api/1.0/`;
        if (sessionUser && sessionUser.token) {
            request = request.clone({
                url: `${baseUrl}${request.url}`,
                setHeaders: {
                    authorization: `Bearer ${sessionUser.token}`
                }
            });
        } else {
            request = request.clone({ url: `${baseUrl}${request.url}` });
        }
        return next.handle(request);
    }
}