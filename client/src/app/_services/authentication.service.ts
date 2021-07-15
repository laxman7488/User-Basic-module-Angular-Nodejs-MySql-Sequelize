import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private sessionUserSubject: BehaviorSubject<User>;
    public sessionUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.sessionUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('sessionUser')));
        this.sessionUser = this.sessionUserSubject.asObservable();
    }

    public get sessionUserValue(): User {
        return this.sessionUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.status && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('sessionUser', JSON.stringify(user.token));
                    this.sessionUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('sessionUser');
        this.sessionUserSubject.next(null);
    }
}