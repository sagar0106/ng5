import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service'; 
@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @Input()  isEdited;
  @Input() item;
  @Output() addProject = new EventEmitter<object>();
  modules = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll('module')
    .subscribe(data => {
        this.modules = data.data;
    });
  }

  add(item) {
   this.addProject.emit(item);
  }

  closeModelOnCross() {
    document.getElementById('id01').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}
