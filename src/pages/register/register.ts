import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController,  PopoverController,Loading} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {ConfirmationPage} from '../confirmation/confirmation';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  signupCredentials = {phoneNumber: '', password: '', gender: ''};

  constructor(public popoverCtrl: PopoverController,private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public signup() {
    this.showLoading();
    this.auth.signup(this.signupCredentials).subscribe(
      retrievedData => {
        if (retrievedData) {
          setTimeout(() => {
            this.loading.dismiss();
            console.log(retrievedData);
            if (retrievedData.success) {
              //userData contains all retrieved user properties
              //let userData = retrievedData.payload;

                console.log('user account not yet confirmed');
                this.presentConfirmationPopover();

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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Patientez...'
    });
    this.loading.present();
  }

  presentConfirmationPopover() {
    let popover = this.popoverCtrl.create(ConfirmationPage,{},{
      enableBackdropDismiss: false,
    });
    popover.present();
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
