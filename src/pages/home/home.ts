import { Component } from '@angular/core';
import { StationMapPage } from '../station-map/station-map';
import { StationListPage } from '../station-list/station-list';

import { NavController } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import { ChatsPage } from '../chats/chats';
import { MapsPage } from '../maps/maps';
import { MeteoPage } from '../meteo/meteo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bookingTab:any;
  chatsTab:any;
  mapsTab: any;
  meteoTab: any;

  constructor(public navCtrl: NavController) {

    this.bookingTab = BookingPage;
    this.chatsTab = ChatsPage;
    this.mapsTab = StationMapPage;
    this.meteoTab = MeteoPage;
  }
}
