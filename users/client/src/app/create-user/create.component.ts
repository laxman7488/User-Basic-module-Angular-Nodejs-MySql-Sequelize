import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'create.component.html'})
export class CreateComponent implements OnInit {
    createForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        
    }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.createForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.create(this.createForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.status){
                    this.alertService.success('User added successful', true);
                    this.router.navigate(['/']);
                    }
                    else{
                        this.alertService.error(data.message);
                        this.loading = false;
                    }
                    

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
