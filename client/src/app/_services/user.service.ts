import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`user`);
    }

    create(user: User) {
        return this.http.post<any>(`user`, user);
    }

    delete(id: number) {
        return this.http.delete<any>(`user/${id}`);
    }
}