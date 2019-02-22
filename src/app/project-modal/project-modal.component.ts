import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @Input()  isEdited;
  @Input() item;
  @Output() addProject = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
  }

  add(item) {
   this.addProject.emit(item);
  }
}
