import { Component } from '@angular/core';
import {App, NavController,NavParams, AlertController,PopoverController, LoadingController, Loading,ViewController} from 'ionic-angular';
import {AuthService, User} from '../../providers/auth-service';
import {HomePage} from '../home/home';


/*
  Generated class for the Confirmation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
  loading: Loading;
  loginCredentials = {confirmationCode: ''};

  constructor(public appCtrl:App,public nav: NavController,public viewCtrl: ViewController, public navParams: NavParams,public popoverCtrl: PopoverController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }
  goHome() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  public confirm(){
   this.showLoading();
    this.auth.confirm(this.loginCredentials).subscribe(
      retrievedData => {
        if (retrievedData) {
          setTimeout(() => {
            this.loading.dismiss();
            console.log(retrievedData);
            if (retrievedData.success) {
              //userData contains all retrieved user properties
              let userData = retrievedData.payload;
                //set the currentUser
                this.auth.currentUser = new User(userData.phoneNumber, userData.gender);
                //add the current user to the list of authenticated users
                //this.auth.users.push(this.auth.currentUser);
                this.goHome();
            } else {
              this.showError(retrievedData.message);
            }
          });
        } else {
          this.showError("Accès refusé");
        }
      },
      error => {
        this.showError(error);
      });
  }

  //TODO: set methods that pages haave in common (such as showLoading,showError...) in a common service
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Patientez...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Echec',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
