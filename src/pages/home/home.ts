import { Component } from '@angular/core';
import { StationMapPage } from '../station-map/station-map';
import { StationListPage } from '../station-list/station-list';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tab1Root: any = StationListPage;
	tab2Root: any = StationMapPage ;
  	
constructor(public navCtrl: NavController) {
    
  }

}
