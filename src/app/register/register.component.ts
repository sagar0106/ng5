import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {};
  userId = '';
  constructor(private router: Router, private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        this.userId = params.get('id');
      });
    this.getUser();
  }

  saveUser() {
      if (this.user['_id']) {
            this.dataService.update('user', this.user['_id'])
        .subscribe(response => {
              this.user = {};
              this.router.navigate(['users']);
          });
      } else {
            this.dataService.create('user', this.user)
        .subscribe(response => {
              this.user = {};
              this.router.navigate(['users']);
          });
      }
  }

  getUser() {
      if (this.userId) {
        this.dataService.getById('user', this.userId)
        .subscribe(response => {
              this.user = {};
              if (response) {
                  this.user = response;
              }
          });
      } else {
          this.user = {};
      }
  }
  clearUser() {
      this.user = {};
  }

}
