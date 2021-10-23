import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-covid19-declaration',
  templateUrl: './covid19-declaration.component.html'
})
export class Covid19DeclarationComponent implements OnInit {
  record;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCovidDashboard().subscribe((res: any) => {
      this.record = res.data;
      console.log(this.record)
    })
  }

}