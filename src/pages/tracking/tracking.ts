import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {Database} from "../../providers/database";
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

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
  private locations: Array<Object>;

  constructor(public navCtrl: NavController,public locationTracker: LocationTracker,private geolocation: Geolocation,public platform: Platform, private database: Database) {
  	this.locations = [];
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

  getLocationHistory(){
    this.database.getAllLocations().then((result) => {
            this.locations = <Array<Object>> result;
            console.log("locations",this.locations);
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }

  loadMap() {
  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
    console.log(resp.coords.latitude+", "+resp.coords.longitude);
    //let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
    let location = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);

    this.map = new GoogleMap(document.getElementById('#map'), {
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
      console.log("map : ",this.map );
    });
  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

}