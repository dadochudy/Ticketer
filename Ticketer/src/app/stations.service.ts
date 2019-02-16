import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StationsService {

  items: Observable<any[]>;
  constructor(private ngFireStore: AngularFirestore) {  }

  searchStations(start, end) {

    return this.ngFireStore.collection(`stations`, ref => ref
      .orderBy('locationIndex')
      .startAt(start.toLowerCase())
      .endAt(end.toLowerCase() + '\uf8ff')
      .limit(5))
      .valueChanges()
      .pipe(debounceTime(200));

  }


}
