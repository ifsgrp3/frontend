import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: "app-covid19-test",
    templateUrl: "./covid19-test.component.html",
    styleUrls: ['./covid19-test.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class Covid19TestComponent implements OnInit {

    form: any;

    constructor(
        ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            notAllow: new FormControl({ value: null, disabled: true }, Validators.required),
            description: new FormControl(null),
            email: new FormControl(null, [Validators.required, Validators.email]),
            presetValue: new FormControl('Hello', Validators.required),
        })
    }

    noSubmit() {
        if (this.form.invalid) {
            // this._services.markFormGroupTouched(this.form);
            return;
        }
    }

}