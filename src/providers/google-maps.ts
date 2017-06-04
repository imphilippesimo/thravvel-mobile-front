import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {App} from 'ionic-angular';
//import {StationDetailPage} from '../pages/station-detail/station-detail';

declare var google;

@Injectable()
export class GoogleMaps {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  center: any;
 
  constructor(public connectivityService: Connectivity, private app: App) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }

  getCenter(){
        return this.center;
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then((data) => {
              resolve(data);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
 
        if(this.connectivityService.isOnline()){
          this.initMap().then(function(data){
              this.center = data;
          });
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        this.center = position;
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // add the user's position marker
                    var markerPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

                    
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        var marker = new google.maps.Marker({
                        map: this.map,
                        animation: google.maps.Animation.DROP,
                        position: markerPos,
                        icon: 'assets/img/yellow.png'
                    })
                    var infoWindowContent = '<h3>' + 'Je suis ici' + '</h3>'

                    this.addInfoWindow(marker, infoWindowContent)
                     this.markers.push(marker);
        resolve(position);
        return position;
 
      });
    });

  }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
 
  addHistoryMarker(lat: number, lng: number): void {
 
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'assets/img/yellow.png'
    });
    this.markers.push(marker);  
 
  }
 
  addMarker(lat: number, lng: number, name: string): void {
 
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
   let content = "<h4>"+ "Agence : " + name +"</h4>" +"</br>" + "<button ion-button (click) ="+ "toto()"+">"+"Link </button>";          
    this.addInfoWindow(marker, content);
    this.markers.push(marker);  
 
  }

  toto(){
    console.log("TOOOOOOTTTTTOOOOOOOO 11111111");
  }


  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
/*
    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map,{marker: marker} );
      console.log("clicked");
      this.app.getActiveNav().push(StationDetailPage,marker);
    });
 */
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }
 
}