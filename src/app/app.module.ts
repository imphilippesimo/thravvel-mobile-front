import { NgModule} from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import {ConfirmationPage} from '../pages/confirmation/confirmation';
import { BookingPage } from '../pages/booking/booking';
import { ChatsPage } from '../pages/chats/chats';
import { MapsPage } from '../pages/maps/maps';
import { MeteoPage } from '../pages/meteo/meteo';
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
    IonicModule.forRoot(MyApp, {
        //backButtonText: 'Go Back',
        //iconMode: 'ios',
        //modalEnter: 'modal-slide-in',
        //modalLeave: 'modal-slide-out',
        //tabsPlacement: 'top',
        //pageTransition: 'ios'
      }, {}
    )
  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ConfirmationPage,
   StationListPage,
    StationMapPage,
    BookingPage,
    ChatsPage,
    MapsPage,
    MeteoPage,

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
    BookingPage,
    ChatsPage,
    MapsPage,
    MeteoPage,


  ],
  providers: [AuthService, Locations, GoogleMaps, Connectivity],

})
export class AppModule {}
