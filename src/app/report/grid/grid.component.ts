import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  dataSource = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll('project')
    .subscribe(response => {
      // this.itemList = this.checkPermission(response.data);
      this.dataSource = response.data;
    }, error => {
        // Handle error here
        if (error.status === 401) {
          this.router.navigate(['login']);
      }
    });
  }

}
