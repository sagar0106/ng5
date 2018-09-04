import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { share, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  constructor(private http: Http, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.updateIsLogin(false);
  }

    login(user) {
      // this.http.post('http://localhost:4000/login', user)
      // .map(response => response.json())
      // .subscribe(userInfo => {
      //   localStorage.setItem('token', JSON.stringify(userInfo.token));
      //   localStorage.setItem('userData', JSON.stringify(userInfo.user));
      //   this.router.navigate(['home']);
      //   },
      //   error => {
      //     // this.showUserError = true;
      //     // this.showErrorMessage = JSON.parse(error._body);
      //   });
      this.authService.login(user);
  }
}
