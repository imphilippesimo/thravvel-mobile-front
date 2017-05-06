import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BackgroundGeolocation,BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {

	 constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation,private geolocation: Geolocation) {
    	console.log('Hello LocationTracker Provider');
  	}

  	//const config: BackgroundGeolocationConfig = {};
	public watch: any;    
  	public latitude: number = 0;
  	public longitude: number = 0;

  	startTracking() {
  	/* Background Tracking */

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10, 
      debug: true,
      interval: 2000 
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

  let options = {
    frequency: 3000, 
    enableHighAccuracy: true
  };

  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

    console.log(position);

    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });

  });
  	}

  	stopTracking() {

  		console.log('stopTracking');

    	this.backgroundGeolocation.finish();
    	this.watch.unsubscribe();

  	}

 

}
