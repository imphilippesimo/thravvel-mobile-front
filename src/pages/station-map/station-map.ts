import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';

/*
  Generated class for the StationMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-station-map',
  templateUrl: 'station-map.html'
})
export class StationMapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: Locations) {
 
  }
 
 /*
  ionViewDidLoad(){
 
    this.platform.ready().then(() => {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
    });
 
  }
  */

  ionViewDidLoad(){
 
        this.platform.ready().then(() => {
 
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load();
 
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
 				console.log("get by services",result);
                let locations = result[1];
 
                for(let location of locations){
                    this.maps.addMarker(location.latitude, location.longitude);
                }
 
            });
 
        });
 
    }

}
