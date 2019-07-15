import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  dataSource = [];
  argument;
  values = [];
  innerWidthOfLarge= Number(window.innerWidth * 94 / 100);
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll('project')
    .subscribe(response => {
      this.argument = 'firstname';
      this.values = [{caption: 'quantity'}];
      this.dataSource = response.data;
    }, error => {
        // Handle error here
        if (error.status === 401) {
          this.router.navigate(['login']);
      }
    });
  }

}
