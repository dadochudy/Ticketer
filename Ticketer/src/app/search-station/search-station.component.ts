import { Component, OnInit, Input } from '@angular/core';

import { StationsService } from '../stations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-station',
  templateUrl: './search-station.component.html',
  styleUrls: ['./search-station.component.scss']
})


export class SearchStationComponent implements OnInit {

  locationSuggestions$: Observable<any>;

  @Input() location: string;

  constructor(private stationService: StationsService) { }

  ngOnInit() {
  }

  SuggestLocation(newLocation) {

    this.locationSuggestions$ = this.stationService.searchStations(newLocation, newLocation);

  }

}
