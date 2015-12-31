import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';

@Component({
    selector: 'login',
    host: { class: 'login' },
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: './dist/components/login/login.html'
})

export class LoginComponent {
  loading: boolean = false;
  loginError: boolean = false;
  user: User = new User();

  constructor(public router: Router, public auth: AuthService) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['Home']);
    }
  }

  login(): void {
    this.loading = true;
    this.auth.checkCredentials(this.user).then((resp) => {
      this.loading = false;
      this.router.navigate(['Home']);
    }, (err) => {
      this.loading = false;
      this.loginError = true;
      this.user = new User();
    });
  }

}
