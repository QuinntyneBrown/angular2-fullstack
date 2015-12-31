import { Injectable, provide } from 'angular2/core';
import { Http } from 'angular2/http';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

declare var location;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  user: User;
  hostname: string;
  port: number;
  protocol: string;
  url: string;

  constructor(public http: Http) {
    if (localStorage.getItem('id_token')) {
      this.user = new User(JSON.parse(localStorage.getItem('profile')));
    }
    this.hostname = location.hostname;
    this.port = location.port;
    this.protocol = location.protocol;
    this.url = this.protocol + '//' + this.hostname + ':' + this.port;
  }

  checkCredentials(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/api/check-credentials', JSON.stringify(user))
        .map(res => res.json())
        .subscribe(data => {
            if (this.processLogin(data)) {
              resolve(true);
            } else {
              reject(false);
            }
        });
    });
  }

  processLogin(data): boolean {
    if (data.status) {
      let decodedToken = this.jwtHelper.decodeToken(data.jwt);
      localStorage.setItem('profile', JSON.stringify(decodedToken));
      localStorage.setItem('id_token', data.jwt);
      this.user = new User(decodedToken);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.user = new User();
  }

  isLoggedIn(): boolean {
    return this.user && this.user.id !== null;
  }
}

export var AUTH_PROVIDERS: any[] = [
  provide(AuthService, { useClass: AuthService })
];
