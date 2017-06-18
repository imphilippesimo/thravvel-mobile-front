import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, PopoverController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { User } from '../../entities/chat/User'

import { ConfirmationPage } from '../confirmation/confirmation';
//import { ValidationResult } from '../shared/interfaces';

let AVATAR_URL = 'http://avatar.3sd.me/80';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  loginCredentials = { phoneNumber: '', password: '' };
  //result: boolean;


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
              this.checkUserConfirmed(userData);
              // if (!this.result) {
              //   console.log('user account not yet confirmed');
              //   this.presentConfirmationPopover();
              //
              // } else {
              //   console.log('Already confirmed user account!!!!');
              //   //set the currentUser
              //   this.auth.currentUser = new User(userData.phoneNumber, userData.gender);
              //   //add the current user to the list of authenticated users
              //   //this.auth.users.push(this.auth.currentUser);
              //   this.nav.setRoot(HomePage);
              // }
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
    let popover = this.popoverCtrl.create(ConfirmationPage, {}, {
      enableBackdropDismiss: false,
    });
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

  private getRandomUsername(): string {
    return 'User-' + (Math.floor(Math.random() * (10000 - 0)) + 1);
  }

  checkUserConfirmed(userData) {
    //let result: boolean = false;
    this.auth.isUserConfirmed().subscribe(
      retrievedData => {

        //if no errors from the server
        if (retrievedData.success) {
          //if the confirmed flag is true
          if (!retrievedData.payload) {
            console.log('user account not yet confirmed');
            this.presentConfirmationPopover();
            //this.result = true;
            //console.log("i" + result);
          } else {
            //this.result = false;
            console.log('Already confirmed user account!!!!');
            /**
             * Register the current authenticated user, (using a fake random username cause 
             * its not yet possible to record the username during user registration), 
             * TODO: update user registration view to record the username and 
             * use userData.userName instead of this.getRandomUsername()
             */
            this.auth.setCurrentUser(new User(this.getRandomUsername(), userData.phoneNumber, userData.gender, AVATAR_URL));
            //add the current user to the list of authenticated users
            //this.auth.users.push(this.auth.currentUser);
            this.nav.setRoot(HomePage);
          }
        } else {
          this.showError(retrievedData.message);
        }
      },
      error => {
        this.showError(error);
      });
    //console.log("o" + result);
    //return result;
  }
}
