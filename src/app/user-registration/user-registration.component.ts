import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

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
        first_name: new FormControl(null, [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        last_name: new FormControl(null, [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        address: new FormControl(null, [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        unit_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(5)]),
        area: new FormControl(null),
        zip_code: new FormControl(null,[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(6)]),
        contact_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(9)]),
        gender: new FormControl(null),
        nric: new FormControl(null, [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern("^[a-zA-Z0-9]*$")]), 
        role: new FormControl(null),
        race: new FormControl(null, Validators.required),
        ble_serial_number: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        date_of_birth: new FormControl(null, Validators.required),
        age: new FormControl(null, [Validators.required, [Validators.pattern("^[0-9]*$"),Validators.maxLength(3)])
    })
  }

  onSubmit() {
    this.form.value.gender = (this.form.value.gender == "Male")? "0" : "1"
    this.form.value.date_of_birth = moment(this.form.value.date_of_birth).format("YYYY-MM-DD");
    if (!parseInt(this.form.value.age)) {
      return;
    }
    this.dataService.recordRegister(this.form.value).subscribe((res: any) => {
      console.log(res);
    })
    const salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(this.form.value.password, salt);
    let registerData = {
      nric: this.form.value.nric,
      hashed_password: hashed_password,
      user_salt: salt,
      ble_serial_number: this.form.value.ble_serial_number,
      account_role: this.form.value.role
    }
    let address = {
      nric: this.form.value.nric,
      street_name: this.form.value.address,
      unit_number: this.form.value.unit_number,
      zip_code: this.form.value.zip_code,
      area: this.form.value.area
    }
    console.log(registerData)
    this.dataService.register(registerData).subscribe((res: any) => {
      console.log(res);
    })
    if (!parseInt(address.unit_number) || !parseInt(address.zip_code)) {
      return;
    }
    this.dataService.addUserAddress(address).subscribe((res: any) => {
      console.log(res);
    })
  }
}
