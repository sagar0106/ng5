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
isEdited = false;
itemList = [];
modules = [];
item = {};
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
            //this.refresh();
            this.itemList.push(JSON.parse(response._body));
            // this.dataService.getById('role', this.selectedRoleId)
            // .subscribe(role => {
            // this.dataService.update('role', role)
            // .subscribe(response => {

            // })
         // })
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
    this.isEdited = true;
  this.dataService.getById('project', id)
  .subscribe(response => {
        this.item = response;
        document.getElementById('id01').style.display = 'block';
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

getEditDataSource(item) {
    this.item = item;
    this.isEdited = true;
    document.getElementById('id01').style.display = 'block';
  }

//   updateDataSource(dataSourceForms) {
//     this.dashboard.dataSources[this.datasourceIndex] = dataSourceForms;
//     this.getDataSourceForm();
//   }
createDataSource() {
    document.getElementById('id01').style.display = 'block';
    this.item = {
        title: '',
        description: '',
        isCompleted: 'Yes'
      };
    this.isEdited = false;
  }
}
