import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
userList = [];
user = '';
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.dataService.getAll('user')
    .subscribe(response => {
        this.userList = response.data;
        this.user = '';
    }, error => {
      // Handle error here
      if (error.status === 401) {
        this.router.navigate(['login']);
    }
  });
}

remove(id) {
    this.dataService.delete('user', id)
  .subscribe(response => {
        this.refresh();
    });
}

edit(id) {
  this.dataService.getById('user', id)
  .subscribe(response => {
        this.user = response;
    });
}

deselect() {
  this.user = '';
}

goToLink() {
  this.router.navigate(['register']);
}
}
