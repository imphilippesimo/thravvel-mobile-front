import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AuthService, User} from '../../providers/auth-service';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import { PopoverController } from 'ionic-angular';
import {ConfirmationPage} from '../confirmation/confirmation';
//import { ValidationResult } from '../shared/interfaces';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  loginCredentials = {phoneNumber: '', password: ''};


  constructor(public popoverCtrl: PopoverController, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.loginCredentials).subscribe(
      retrievedData => {
        if (retrievedData) {
          setTimeout(() => {
            this.loading.dismiss();
            console.log(retrievedData);
            if (retrievedData.success) {
              //userData contains all retrieved user properties
              let userData = retrievedData.payload;
               if(!userData.confirmed) {
                 console.log('user account not yet confirmed');
                 this.presentConfirmationPopover();
               }else {
                 console.log('Already confirmed user account!!!!');
                 //set the currentUser
                 this.auth.currentUser = new User(userData.phoneNumber, userData.gender);
                 //add the current user to the list of authenticated users
                 //this.auth.users.push(this.auth.currentUser);
                 this.nav.setRoot(HomePage);
               }
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

  presentConfirmationPopover() {
    let popover = this.popoverCtrl.create(ConfirmationPage);
    popover.present();
  }


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
