import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-season-select',
  templateUrl: './season-select.component.html',
  styleUrls: ['./season-select.component.css']
})
export class SeasonSelectComponent implements OnInit {
  season: number = 2005;
  @Output() drivers_list = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  getDrivers(){
    fetch("https://ergast.com/api/f1/" + this.season + "/drivers.json")
    .then(resp => resp.json())
    .then(data => data.MRData.DriverTable.Drivers)
    .then(drivers => this.drivers_list.emit(drivers));
  }

  // ngOnChanges(changes: SimpleChanges){
  //   console.log(this.data);
  // }

}
