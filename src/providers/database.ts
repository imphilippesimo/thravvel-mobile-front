import {Injectable} from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite} from 'ionic-native';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  private storage : SQLite;
  private isOpen : boolean;

  public constructor() {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this
        .storage
        .openDatabase({name: "thravvel.db", location: "default"})
        .then(() => {
          this
            .storage
            .executeSql("CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, lati" +
                "tude REAL, longitude REAL, time INTEGER)",
            []);
          this.isOpen = true;
        });
    }
  }

  public insertLocation(latitude : number, longitude : number, time : number) {
    return new Promise((resolve, reject) => {
      this
        .storage
        .executeSql("INSERT INTO locations (latitude, longitude,time) VALUES (?, ?, ?)", [latitude, longitude, time])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  public getAllLocations() {
    return new Promise((resolve, reject) => {
      this
        .storage
        .executeSql("SELECT * FROM locations order by time asc", [])
        .then((data) => {
          let locations = [];
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              locations.push({
                id: data
                  .rows
                  .item(i)
                  .id,
                latitude: data
                  .rows
                  .item(i)
                  .latitude,
                longitude: data
                  .rows
                  .item(i)
                  .longitude,
                time: data
                  .rows
                  .item(i)
                  .time
              });
            }
          }
          resolve(locations);
        }, (error) => {
          reject(error);
        });
    });
  }
}