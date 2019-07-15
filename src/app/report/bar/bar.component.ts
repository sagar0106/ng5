import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input() subType;
  dataSource = [];
  argument;
  values = [];
  innerWidthOfLarge = Number(window.innerWidth * 94 / 100);
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll('project')
    .subscribe(response => {
      this.argument = 'firstname';
      this.values = [{caption: 'quantity', type: this.subType}];
      this.dataSource = response.data;
    }, error => {
        // Handle error here
        if (error.status === 401) {
          this.router.navigate(['login']);
      }
    });
  }

}
