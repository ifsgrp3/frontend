import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-health-declaration',
  templateUrl: './health-declaration.component.html'
})
export class HealthDeclarationComponent implements OnInit {
  date;
  symptoms;
  temperature;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    let data = {
      covid_symptoms: parseInt(this.symptoms),
      temperature: parseFloat(this.temperature)
    }
    this.dataService.uploadHealthDeclaration(data).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.log(err)
    })
  }

}