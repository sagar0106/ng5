import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
itemList = [];
item = '';
selectedItem = '';
projectId = '';
  constructor(private router: Router, private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });
    this.refresh();
  }
            refresh() {
                  this.dataService.getById('project', this.projectId)
  .subscribe(response => {
                    response.toDo.forEach(element => {
                        if (element.isCompleted) {
                            element.isCompleted = 'Yes';
                        } else {
                            element.isCompleted = 'No';
                        }
                    });
                    this.itemList = response.toDo;
                    this.item = '';
                }, error => {
                  // Handle error here
                  if (error.status === 401) {
                    this.router.navigate(['login']);
                }
              });
            }

            add() {
                if (this.item['isCompleted'] === 'Yes') {
                    this.item['isCompleted'] = true;
                } else if (this.item['isCompleted'] === 'No') {
                    this.item['isCompleted'] = false;
                }
                if (this.item['_id']) {
                      this.dataService.update('toDo', this.item)
                      .subscribe(response => {
                        this.refresh();
                    });
                } else {
                  this.dataService.create('toDo', this.item)
                  .subscribe(response => {
                        const body = { $push: { toDo: [response._id] } };
                          this.dataService.updateJoin('project', this.projectId, body)
                          .subscribe(data => {
                            this.refresh();
                        });
                    });
                }
            }

            remove(id) {
              this.dataService.delete('toDo', id)
              .subscribe(response => {
                    const body = { $pullAll: { toDo: [id] } };
                    this.dataService.updateJoin('project', this.projectId, body)
                          .subscribe(data => {
                        this.refresh();
                    });
                });
            }

            edit(id) {
              this.dataService.getById('toDo', id)
              .subscribe(response => {
                    if (response.isCompleted) {
                        response.isCompleted = 'Yes';
                    } else {
                        response.isCompleted = 'No';
                    }
                    this.item = response;
                });
            }

            deselect() {
                this.item = '';
            }

            moveItemUp() {
                const index = this.itemList.indexOf(this.selectedItem);

                if (index <= 0) {
                    return;
                } else {
                    const removed = this.itemList.splice(index, 1);
                    this.itemList.splice(index - 1, 0, removed[0]);
                }
            }

            moveItemDown() {
                const index = this.itemList.indexOf(this.selectedItem);

                if (index >= this.itemList.length - 1) {
                    return;
                } else {
                    const removed = this.itemList.splice(index, 1);
                    this.itemList.splice(index + 1, 0, removed[0]);
                }
            }

            selectRow(item, index) {
                if (item.isSelected) {
                    this.selectedItem = item;
                }
                this.itemList.forEach(elem => {
                    if (elem !== item) {
                        if (elem.isSelected) {
                            elem.isSelected = !elem.isSelected;
                        }
                    }
                });
            }
}
