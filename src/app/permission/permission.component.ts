import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router} from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  existingResource;
  resources;
  modules;
  roles;
  role;
  selectedModuleId = '';
  selectedRoleId = '';
  canSave = false;
  loaded = true;
  failed;
  successful;
  titleMessege = 'Select/Desellect All';

  checkUncheckAll = {
      schemas: {
          view: false,
          create: false,
          edit: false,
          review: false,
          editSchema: false
      },
  };

  constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.activate();
  }

    //   checkDefaultViewPermission = rolePermissions.checkDefaultViewPermission;

    initiateOnRoleChange() {
        this.resources = {
            schemas: [],
        };
        this.selectedModuleId = '';
    }

    // function activate() {
    //     initiateOnRoleChange();

    //     var getAllData = [{
    //         tableName: 'modules',
    //         isActive: true,
    //         select: 'title',
    //         sort: 'title'
    //     }, {
    //         tableName: 'roles',
    //         isActive: true,
    //         select: 'title',
    //         sort: 'title'
    //     }, {
    //         tableName: 'resources',
    //         isActive: true,
    //         select: 'title,entity',
    //         sort: 'title'
    //     }, {
    //         tableName: 'reportTemplates',
    //         isActive: true,
    //         select: 'bookmarkDescription',
    //         sort: 'bookmarkDescription',
    //         query: { isRemoved: false }
    //     }];

    //     $timeout(function () {
    //         loaded = false;
    //     }, drpdwnloadtimeout || 0);

    //     resourceService.getAllAppData(getAllData)
    //         .then(function (response) {
    //             loaded = false;

    //             var data = response.data.plain();

    //             roles = data.roles;
    //             modules = data.modules;
    //             allResources = data.resources;
    //             allReportTemplates = data.reportTemplates;

    //         })
    //         .catch(function (err) {
    //             $log.error(err);
    //         });
    // }

    activate() {
        this.initiateOnRoleChange();
        setTimeout(() => {
            this.loaded = false;
        }, 0);
          this.dataService.getAll('role')
          .subscribe(response => {
            this.roles = response.data;
            this.dataService.getAll('module')
          .subscribe(res => {
                this.modules = res.data;
            });
        }, error => {
            // Handle error here
            if (error.status === 401) {
              this.router.navigate(['login']);
            }
        });
    }

    fetchForUpdateRole() {
        this.initiateOnRoleChange();
        if (this.selectedRoleId) {
              this.dataService.getById('role', this.selectedRoleId)
  .subscribe(response => {
                this.role = response;
            });
        }
    }


    fetchForUpdateModule() {
        if (this.selectedRoleId && this.selectedModuleId) {

           this.dataService.getAll('project')
          .subscribe(response => {
                this.resources.schemas = ((response.data || []).map(function(item) {
                    return {
                        '_id': item._id,
                        'title': item.title,
                        'entity': item._id,
                        'entityType': 'schemas'
                    };
                }));

                const existingSchemaPermission = ((this.role.modules || []).find(function(obj) {
                    return obj._id === this.selectedModuleId;
                }) || {}).permissions || [];


                this.resources.schemas.forEach(function(schema) {
                    this.existingResource = {};
                    this.existingResource = existingSchemaPermission.find(function(obj) { return obj._id === schema._id ; });
                    if (this.existingResource) {
                        this.existingResource.title = schema.title;
                        Object.assign(schema, this.existingResource);
                    }
                });

                this.checkBoxCheckAll(this.resources.schemas, this.checkUncheckAll.schemas);

            });

        }
    }

      saveRolePermissions() {

        let module;
        this.role.modules = (this.modules || []).map(function(item) {
            module = {};
            module._id = item._id;
            module.permissions = [];
            if (item._id === this.selectedModuleId) {
                module.permissions = (module.permissions || []).concat(this.resources.schemas);
            } else {
                const currentPermissions = ((this.role.modules || []).find(function(obj) { return obj._id == item._id; }) || {}).permissions || [];
                this.oldSchemaAndModulerResource = (currentPermissions || []).filter(function(obj) {
                    return obj.entityType === 'schemas';
                });
                module.permissions = (module.permissions || []).concat(this.oldSchemaAndModulerResource);
            }

            return module;
        });

        // role
        //     .save(false)
        //     .then(function() {
        //         $window.scrollTo(0, 0);
        //         qc3Alert.alert('rolePermissions', function() {
        //             canSave = false;

        //             successful = true;
        //             $timeout(function() {
        //                 successful = false;
        //             }, 5000);
        //         });
        //     })

          this.dataService.update('role', this.role)
          .subscribe(response => {
                window.scrollTo(0, 0);
                this.canSave = false;

                this.successful = true;
                setTimeout(() => {
                    this.successful = false;
                }, 5000);
            }, error => {
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 5000);
            });
    }

    checkBoxCheck(currentItem) {
        currentItem.view = !!(currentItem.create || currentItem.edit || currentItem.review || currentItem.view);
        currentItem.create = !!(currentItem.edit || currentItem.review || currentItem.create);
        currentItem.edit = !!(currentItem.review || currentItem.edit);
    }

    processAll(type, allData, checkBoxCheckAllModal) {
        this.checkBoxCheck(checkBoxCheckAllModal);

        (allData || []).forEach(function(data) {
            data[type] = (type === 'view') ? true : checkBoxCheckAllModal[type];
            this.checkBoxCheck(data);
        });
    }

    checkBoxCheckAll(data, checkBoxCheckAllModal) {
        checkBoxCheckAllModal['view'] = data.every(function(obj) { return obj.view; });
        checkBoxCheckAllModal['create'] = data.every(function(obj) { return obj.create; });
        checkBoxCheckAllModal['edit'] = data.every(function(obj) { return obj.edit; });
        checkBoxCheckAllModal['review'] = data.every(function(obj) { return obj.review; });
        checkBoxCheckAllModal['editSchema'] = data.every(function(obj) { return obj.editSchema; });
    }

    // activate();
}
