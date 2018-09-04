import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
user = {};
isLoggedIn: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
      this.authService.logout();
  }

    setMenuclose() {
      setTimeout(function() {
          return false;
      }, 1500);
  }

  goToUser() {
    this.router.navigate(['user']);
  }

  goToPermission() {
    this.router.navigate(['permission']);
  }

}
