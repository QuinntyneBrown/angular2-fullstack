import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, Location } from 'angular2/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'navigation',
  host: {class: 'navigation'},
  inputs: ['loggedIn'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: './dist/components/navigation/navigation.html'
})

export class NavigationComponent {
  loggedIn: boolean;

  constructor(public auth: AuthService, public router: Router, public location: Location) {

  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['Login']);
  }

  getLinkStyle(path) {
    return this.location.path() === path;
  }

}
