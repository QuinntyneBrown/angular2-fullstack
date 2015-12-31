import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AuthService } from '../../services/auth';

import { NavigationComponent } from '../navigation/navigation';
import { HomeComponent } from '../home/home';
import { DocumentationComponent } from '../documentation/documentation';
import { LoginComponent } from '../login/login';
import { SettingsComponent } from '../settings/settings';

@Component({
  selector: 'app',
  host: { class: 'app' },
  directives: [NavigationComponent, ROUTER_DIRECTIVES],
  templateUrl: './dist/components/app/app.html'
})

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/documentation', name: 'Documentation', component: DocumentationComponent },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/settings', name: 'Settings', component: SettingsComponent }
])

export class App {
  constructor(public router: Router, public auth: AuthService) { }

  loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
