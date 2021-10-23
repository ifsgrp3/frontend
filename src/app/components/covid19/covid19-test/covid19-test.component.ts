import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';


@Component({
    selector: "app-covid19-test",
    templateUrl: "./covid19-test.component.html",
    styleUrls: ['./covid19-test.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class Covid19TestComponent implements OnInit {

    form: any;
    result;
    type;

    constructor(
        private dataService: DataService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = new FormGroup({
            date: new FormControl(null, Validators.required)
        })
    }

    noSubmit() {
        // if (this.form.invalid) {
        //     // this._services.markFormGroupTouched(this.form);
        //     return;
        // }
    this.dataService.getProfile()
      .subscribe((res: any) => {
        console.log(res)
        let data = {
            nric: res.data[0].nric,
            covid19_test_type: this.type,
            test_result: this.result
        }
        this.dataService.uploadCovidTest(data)
      .subscribe((res: any) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    })
    }

}