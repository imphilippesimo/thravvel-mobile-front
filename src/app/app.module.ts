import { NgModule} from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import {ConfirmationPage} from '../pages/confirmation/confirmation';
import { HttpModule, JsonpModule } from '@angular/http';
import { StationListPage } from '../pages/station-list/station-list';
import { StationMapPage } from '../pages/station-map/station-map';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';

@NgModule({

  imports: [
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ConfirmationPage,
   StationListPage,
    StationMapPage,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ConfirmationPage,
    StationListPage,
    StationMapPage,

  ],
  providers: [AuthService, Locations, GoogleMaps, Connectivity],

})
export class AppModule {}
