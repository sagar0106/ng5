import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
@Injectable()
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(true);
get isLoggedIn() {
  return this.loggedIn.asObservable();
}
constructor(private http: Http, private router: Router) { }
login(user) {
 this.http.post('http://localhost:4000/login', user)
      .map(response => response.json())
      .subscribe(userInfo => {
        this.loggedIn.next(true);
        localStorage.setItem('token', JSON.stringify(userInfo.token));
        localStorage.setItem('userData', JSON.stringify(userInfo.user));
        this.router.navigate(['home']);
        },
        error => {
          // this.showUserError = true;
          // this.showErrorMessage = JSON.parse(error._body);
        });
}
logout() {
this.loggedIn.next(false);
 localStorage.removeItem('token');
      this.router.navigate(['login']);
}

updateIsLogin(data) {
this.loggedIn.next(data);
}
}
