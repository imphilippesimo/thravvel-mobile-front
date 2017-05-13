import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

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

	map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,public locationTracker: LocationTracker,private geolocation: Geolocation,public platform: Platform) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.platform.ready().then(() => {
    	this.loadMap();
  	});
  }

   start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

  loadMap() {
  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    console.log(resp.coords.latitude+", "+resp.coords.longitude);
    let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

}