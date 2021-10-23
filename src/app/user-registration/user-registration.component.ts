import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html'
})
export class UserRegistrationComponent implements OnInit {
  form: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
        first_name: new FormControl(null, Validators.required),
        last_name: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        area: new FormControl(null),
        zip_code: new FormControl(null),
        contact_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
        gender: new FormControl(null, Validators.required),
        nric: new FormControl(null, Validators.required),
        role: new FormControl(null),
        race: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.form.value.gender = (this.form.value.gender == "Male")? 0 : 1
    this.dataService.recordRegister(this.form.value).subscribe((res: any) => {
      console.log(res);
    })
  }
}
