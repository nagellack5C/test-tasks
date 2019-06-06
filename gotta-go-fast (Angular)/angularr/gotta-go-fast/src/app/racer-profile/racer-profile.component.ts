import { Component, OnInit, Input } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-racer-profile',
  templateUrl: './racer-profile.component.html',
  styleUrls: ['./racer-profile.component.css']
})
export class RacerProfileComponent implements OnInit {
  @Input("racer") driver: {url: string, givenName: string, familyName: string, nationality: string};
  driver_image: string = "../../assets/profile_default_m.jpg";
  visible = false;

  constructor() { }

  ngOnInit() {
    let url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&pithumbsize=100&titles="
    + this.driver.url.split("wiki/")[1];
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.query.pages[Object.keys(resp.query.pages)[0]].hasOwnProperty("thumbnail")){
        return resp.query.pages[Object.keys(resp.query.pages)[0]].thumbnail.source;
      } else {
        return "../../assets/profile_default_m.jpg";
      }
    })
    .then(image => this.driver_image = image);
  }

}

// Nick_Heidfeld
