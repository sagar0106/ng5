import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router, ActivatedRoute} from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class ToDoComponent implements OnInit {
itemList = [];
item = {title: '', description: '', isCompleted: ''};
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
                    this.item = {title: '', description: '', isCompleted: ''};
                }, error => {
                  // Handle error here
                  if (error.status === 401) {
                    this.router.navigate(['login']);
                }
              });
            }

            add() {
                const finalItem = _.cloneDeep(this.item);
                if (this.item['isCompleted'] === 'Yes') {
                    finalItem['isCompleted'] = true;
                } else if (this.item['isCompleted'] === 'No') {
                    finalItem['isCompleted'] = false;
                }
                if (this.item['_id']) {
                      this.dataService.update('toDo', finalItem)
                      .subscribe(response => {
                        this.refresh();
                    });
                } else {
                  this.dataService.create('toDo', finalItem)
                  .subscribe(response => {
                        const body = { $push: { toDo: [JSON.parse(response._body)._id] } };
                          this.dataService.updateJoin('project', this.projectId, body)
                          .subscribe(data => {
                           // this.refresh();
                           const responsebody = JSON.parse(response._body);
                           if (responsebody.isCompleted) {
                            responsebody.isCompleted = 'Yes';
                        } else {
                            responsebody.isCompleted = 'No';
                        }
                           this.itemList.push(responsebody);
                           this.item = {title: '', description: '', isCompleted: ''};
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
                       // this.refresh();
                       _.remove(this.itemList, {'_id': id} );
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
                this.item = {title: '', description: '', isCompleted: ''};
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
