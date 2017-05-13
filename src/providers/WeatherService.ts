import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {
  private _appid = '8346bee6f03aff6aac1111d01117a424';

  constructor(private http: Http) {}

   public getWeather(url: string, city: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/${url}${city}&mode=json&units=metric&APPID=${this._appid}`)
      .map(hours => hours.json());
  }

}
