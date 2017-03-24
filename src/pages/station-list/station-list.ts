import { Component } from '@angular/core';
import { Locations } from '../../providers/locations';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StationList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-station-list',
  templateUrl: 'station-list.html'
})
export class StationListPage {

  constructor(public navCtrl: NavController, public locations: Locations) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationListPage');
  }

}
