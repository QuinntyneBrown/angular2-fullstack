import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, APP_BASE_HREF } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AUTH_PROVIDERS } from './services/auth';
import { App } from './components/app/app';
// import {enableProdMode} from 'angular2/core';

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: () => {
      return new AuthHttp();
    }
  }),
  provide(APP_BASE_HREF, {useValue: '/'}),
  AUTH_PROVIDERS
]);
