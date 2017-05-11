import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';

/*
  Generated class for the Tracking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html'
})
export class TrackingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public locationTracker: LocationTracker) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
  }

   start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}