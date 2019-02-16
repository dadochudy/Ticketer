import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { addDays, format } from 'date-fns';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('dates') datesEl: ElementRef;

  hours: number;
  minutes: number;
  date = new Date();
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

    console.log(this.date);
  }

  setDates() {
    const datesEl = this.datesEl;

    for (let i = 2, j = 0; i <= 8; i++, j++) {

      const timeStamp = addDays(new Date(), i);
      datesEl.nativeElement.children[j].children[0].children[1].children[0].innerHTML = format(timeStamp, 'ddd');
      datesEl.nativeElement.children[j].children[0].children[1].children[1].innerHTML = format(timeStamp, 'D' );

    }
  }

}
