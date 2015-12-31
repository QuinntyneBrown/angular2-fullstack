import { Component, Injector } from 'angular2/core';
import { CanActivate, Router } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'settings',
  host: { class: 'settings' },
  templateUrl: './dist/components/settings/settings.html'
})

@CanActivate((next: any, prev: any) => {
  let injector: any = Injector.resolveAndCreate([AuthService, HTTP_PROVIDERS]);
  let authService: AuthService = injector.get(AuthService);
  return authService.isLoggedIn();
})

export class SettingsComponent {
  constructor(public auth: AuthService) { }
}
