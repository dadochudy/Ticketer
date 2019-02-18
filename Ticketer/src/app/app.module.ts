import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { environment } from '../environments/environment';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchStationComponent } from './search-station/search-station.component';
import { TimeSelectScrollDirective } from './time-select-scroll.directive';
import { LeadingZeroPipe } from './leading-zero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchStationComponent,
    TimeSelectScrollDirective,
    LeadingZeroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
