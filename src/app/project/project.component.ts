import { environment } from './../../environments/environment';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
showModal = false;
itemList = [];
modules = [];
item = '';
  constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.showModal = false;
    this.dataService.getAll('project')
    .subscribe(response => {
      this.itemList = this.checkPermission(response.data);
      this.item = '';
      this.dataService.getAll('module')
      .subscribe(data => {
          this.modules = data.data;
      });
    }, error => {
        // Handle error here
        if (error.status === 401) {
          this.router.navigate(['login']);
      }
    });
}

 add(item) {
    if (this.item['_id']) {
      this.dataService.update('project', item)
      .subscribe(response => {
            this.refresh();
        });
    } else {
      this.dataService.create('project', item)
      .subscribe(response => {
            this.refresh();
        });
    }
}

remove(id) {
  this.dataService.delete('project', id)
  .subscribe(response => {
        this.refresh();
    });
}

edit(id) {
  this.dataService.getById('project', id)
  .subscribe(response => {
        this.item = response;
        this.showModal = true;
    }, error => {
    });
    // $scope.item = angular.copy(item);
}

deselect() {
    this.item = '';
}

checkPermission(data) {
    const permissions = JSON.parse(localStorage.getItem('userData')).permissions;
    const finalData = [];
    data.forEach(element => {
        if (permissions[element.module] && permissions[element.module][element._id]) {
            finalData.push(element);
        }
    });
    return finalData;
}

// }])
// .directive('modal', function() {
// return {
//     template: '<div class="modal fade">' +
//         '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//         '<div class="modal-header">' +
//         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//         '<h4 class="modal-title">{{ item.content.title }}</h4>' +
//         '</div>' +
//         '<div class="modal-body" ng-transclude></div>' +
//         '</div>' +
//         '</div>' +
//         '</div>',
//     restrict: 'E',
//     transclude: true,
//     replace: true,
//     scope: true,
//     link: function postLink(scope, element, attrs, ctrl) {
//         //   scope.title = attrs.title;
//         scope.$watch(attrs.visible, function(value) {

//             if (value)
//                 $(element).modal('show');
//             else
//                 $(element).modal('hide');
//         });
//     }
// };
// });
}
