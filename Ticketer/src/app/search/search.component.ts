import { Component, OnInit } from '@angular/core';
import { addDays, format } from 'date-fns';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  hours: number;
  minutes: number;
  date = new Date();
  datesForWeek = [];
  fromLocation = 'Trnava';
  toLocation = 'Pezinok';

  constructor() {
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
  }

  ngOnInit() {
    this.setDates();
  }

  switchLocation() {
    const temp = this.fromLocation;
    this.fromLocation = this.toLocation;
    this.toLocation = temp;
  }

  selectedDate(dayOffset: number = 0) {

    this.date = new Date();

    if (dayOffset !== 0) {
      this.date = addDays(this.date, dayOffset);

      console.log(format(this.date, 'ddd/MMMM/YYYY'));
    }

  }

  setDates() {

    for (let i = 0; i <= 6; i++) {

      const timeStamp = addDays(new Date(), (i + 2));

      let listItem = {
        index: (i + 2),
        identifier: 'date' + i,
        dayOfWeek: format(timeStamp, 'ddd'),
        dayOfMonth: format(timeStamp, 'D' )
      };

      this.datesForWeek.push(listItem);

    }
  }

}
