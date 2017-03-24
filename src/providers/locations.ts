import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Locations provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class Coordinates {
  latitude: number;
  longitude: number;
  distance: number;
  limite: number;

  constructor(latitude: number, longitude: number, distance: number, limite: number ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.distance = distance;
    this.limite = limite;

  }
}


@Injectable()
export class Locations {

 data: any;
 connectStationsAlias = 'http://ec2-52-89-54-132.us-west-2.compute.amazonaws.com:8080/thravvel-core/rest/stations/nearest';
 coordinates: Coordinates;
 
    constructor(public http: Http) {
 
    }
 
    load(){


    	this.coordinates  = {latitude:-4.3275315, longitude:15.341580799999974, distance: 20, limite: 4};
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
 
            this.http.post(this.connectStationsAlias,this.coordinates).map(res => res.json()).subscribe(data => {
            	console.log(data);
 				this.data = data.payload.content;
                resolve(this.data);
 
            });
 
        });
 
    }

    getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }

}
