import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import {Database} from "../../providers/database";
import { LocationTracker } from '../../providers/location-tracker';

//import { TrackingPage } from '../tracking/tracking';

/*
  Generated class for the StationMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

export class Point {
  lat: number;
  lng: number;

  constructor(latitude: number, longitude: number) {
    this.lat = latitude;
    this.lng = longitude;
  }
}

@Component({
  selector: 'page-station-map',
  templateUrl: 'station-map.html',
})
export class StationMapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  private locationsHist: any;
 
  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: Locations,public locationTracker: LocationTracker,private database: Database) {
  let rootPage = this;
  this.locationsHist = [];
 
  }

   start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

  getLocationHistory(){
    this.database.getAllLocations().then((result) => {
            this.locationsHist =  result;
            console.log("locations",this.locationsHist);
            
            var locationsRoute = [];
            var point : Point;
            for(let location of this.locationsHist){
                    console.log("HELLLOOOOOOOOOOOOO");
                    this.maps.addHistoryMarker(location.latitude, location.longitude);
                    point = {lat:location.latitude, lng:location.latitude};
                    locationsRoute.push(point);
                }
                console.log("for route", locationsRoute);
             this.maps.drawRoute(locationsRoute);
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }

  goToTrackingPage(){
     // this.navCtrl.push(TrackingPage);
  }

  ionViewDidLoad(){
 
        this.platform.ready().then(() => {
            let locationsLoaded;
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then( (data) =>  {
            locationsLoaded = this.locations.load(data);

             Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
                let locations = result[1];
                for(let location of locations){
                    this.maps.addMarker(location.latitude, location.longitude, location.name);
                }
 
            });
               
            });
        });
 
    }

}
