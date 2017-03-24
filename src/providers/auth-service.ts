import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/*
 Generated class for the Authservice provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
export class User {
  phoneNumber: string;
  gender: String;

  constructor(phoneNumber: string, gender: string) {
    this.phoneNumber = phoneNumber;
    this.gender = gender;

  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  users: User[];
  //TODO: get the host and the port variables from a global scope method because they can change at any time
   connectUserAlias = 'http://ec2-52-89-54-132.us-west-2.compute.amazonaws.com:8080/thravvel-core/rest/users/connect';
  confirmUserAccountAlias = 'http://ec2-52-89-54-132.us-west-2.compute.amazonaws.com:8080/thravvel-core/rest/users/confirm';
  //connectUserAlias = 'http://localhost:8080/thravvel-core/rest/users/connect';
  //confirmUserAccountAlias = 'http://localhost:8080/thravvel-core/rest/users/confirm';


  constructor(public http: Http) {
    console.log('Hello Authservice Provider');
  }

  public login(credentials): Observable<any> {

    if (credentials.phoneNumber === '' || credentials.password === '') {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(this.connectUserAlias,credentials,{
        withCredentials:true
      })
        .map(this.handleResponse)
        .catch(this.handleError);

    }
  }

  public confirm(credentials): Observable<any> {

    if (credentials.confirmationCode === '' ) {
      return Observable.throw("Please insert confirmation code");
    } else {
      return this.http.post(this. confirmUserAccountAlias,credentials.confirmationCode,{
        withCredentials:true
      })
        .map(this.handleResponse)
        .catch(this.handleError);

    }
  }

  private handleResponse(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
      console.log(errMsg);
    }
    return Observable.throw(errMsg);

  }


}
