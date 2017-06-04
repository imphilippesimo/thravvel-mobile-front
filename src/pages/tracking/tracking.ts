import { Component, ElementRef, ViewChild  } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
//import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {Database} from "../../providers/database";
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
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

  constructor(private googleMaps: GoogleMaps,public navCtrl: NavController,public locationTracker: LocationTracker,private geolocation: Geolocation,public platform: Platform, private database: Database) {
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
    let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
    let element: HTMLElement = document.getElementById('map');

   // this.map = 
    this.map = this.googleMaps.create(element, {
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

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      console.log("map : ",this.map );
    });
  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

}