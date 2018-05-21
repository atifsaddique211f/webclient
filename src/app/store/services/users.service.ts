// Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Helpers
import { apiUrl } from '../../shared/config';

// Models
import { User } from '../models';

// Rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { OpenPgpService } from './openpgp.service';


declare var openpgp;
@Injectable()
export class UsersService {
  options: any;
  encrypted: any;
  pubkey: any;
  privkey: any;
  passphrase: any;
  privKeyObj: any;

  constructor(
    private http: HttpClient,
    // private mailService: MailService,
    // private sharedService: SharedService,
    private router: Router,
    private openPgpService: OpenPgpService
  ) {}

  setTokenExpiration() {
    const expiration = new Date().getTime() + 7 * (1000 * 60 * 60 * 24);
    sessionStorage.setItem('token_expiration', expiration.toString());
  }

  refreshToken(): Observable<any> {
    const body = { token: sessionStorage.getItem('token') };
    const url = `${apiUrl}auth/refresh/`;
    return this.http.post<any>(url, body).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token);
        this.setTokenExpiration();
      })
    );
  }

  signedIn() {
    const token_active =
      +sessionStorage.getItem('token_expiration') > new Date().getTime();
    if (!!sessionStorage.getItem('token') && token_active) {
      return true;
    } else {
      return false;
    }
  }

  signIn(body): Observable<any> {
    const url = `${apiUrl}auth/sign-in/`;
    return this.http.post<any>(url, body).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token);
        this.setTokenExpiration();
      })
    );
  }

  signOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token_expiration');
    this.router.navigate(['/']);
    // this.mailService.clear();
  }

  signUp(user): Observable<any> {
    const url = `${apiUrl}auth/sign-up/`;
    const body = {
      fingerprint: this.openPgpService.getFingerprint(),
      private_key: this.openPgpService.getPrivateKey(),
      public_key: this.openPgpService.getPubKey(),
      username: user.username,
      password: user.password,
      recaptcha: user.captchaResponse
    };
    console.log(body);
    return this.http.post<any>(url, body);
  }

  verifyToken(): Observable<any> {
    const body = { token: sessionStorage.getItem('token') };
    const url = `${apiUrl}auth/verify/`;
    return this.http.post<any>(url, body);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getNecessaryTokenUrl(url) {
    // if (url.indexOf('blog/posts') > -1) {
    //   return true;
    // }

    if (url.indexOf('users/accounts') > -1) {
      return true;
    }

    if (url.indexOf('users/whitelist') > -1) {
      return true;
    }

    if (url.indexOf('users/contact') > -1) {
      return true;
    }
    return false;
  }

  getAccounts(id) {
    const url = `${apiUrl}users/accounts/${id}/`;
    const body = {};
    return this.http.get<any>(url, body);
  }

  getWhiteList(limit = 0, offset = 0) {
    const url = `${apiUrl}users/whitelist/?limit=${limit}&offset=${offset}`;
    const body = {};
    return this.http.get<any>(url, body);
  }

  addWhiteList(email, name) {
    const url = `${apiUrl}users/whitelist/`;
    const body = { email: email, name: name };
    return this.http.post<any>(url, body);
  }

  deleteWhiteList(id) {
    const url = `${apiUrl}users/whitelist/${id}/`;
    const body = {};
    return this.http.delete<any>(url, body);
  }

  getBlackList(limit = 0, offset = 0) {
    const url = `${apiUrl}users/whitelist/?limit=${limit}&offset=${offset}`;
    const body = {};
    return this.http.get<any>(url, body);
  }

  addBlackList(email, name) {
    const url = `${apiUrl}users/whitelist/`;
    const body = { email: email, name: name };
    return this.http.post<any>(url, body);
  }

  deleteBlackList(id) {
    const url = `${apiUrl}users/whitelist/${id}/`;
    const body = {};
    return this.http.delete<any>(url, body);
  }

  getContact(limit = 0, offset = 0) {
    const url = `${apiUrl}users/contacts/?limit=${limit}&offset=${offset}`;
    const body = {};
    return this.http.get<any>(url, body);
  }

  addContact(payload) {
    const url = `${apiUrl}users/contacts/`;
    const body = {
      id: payload.id,
      address: payload.address,
      email: payload.email,
      name: payload.name,
      note: payload.note,
      phone: payload.phone,
      phone2: payload.phone2 };
    return this.http.post<any>(url, body);
  }

  deleteContact(id) {
    const url = `${apiUrl}users/contacts/${id}/`;
    const body = {};
    return this.http.delete<any>(url, body);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
