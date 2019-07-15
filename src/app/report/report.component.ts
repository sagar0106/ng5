import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
dataSource = [];
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

}
