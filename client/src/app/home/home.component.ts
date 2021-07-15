import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService, AlertService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    sessionUser: User;
    sessionUserSubscription: Subscription;
    data:{};
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.sessionUserSubscription = this.authenticationService.sessionUser.subscribe(user => {
            this.sessionUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.sessionUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(data => {
            if(data.status){ 
                this.alertService.success(data.message);
                this.loadAllUsers();
            }else{
                this.alertService.error(data.message);
            }
            
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(data => {
            let allUser=(data.status && data.data)?data.data:[];
            this.users = allUser;
        });
    }
}