import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { MatInput, MatFormField } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gotta Go Fast';
  drivers = [];
  drivers_to_show = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  onDriversFound(drivers){
    console.log(drivers);
    this.drivers = drivers;
    this.drivers_to_show = drivers.slice(0, 10);
  }

  slice_drivers(i){
    this.drivers_to_show = this.drivers.slice(i*10, i*10+10);
  }


}
