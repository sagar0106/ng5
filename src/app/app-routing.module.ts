import { RegisterComponent } from './register/register.component';
import { PermissionComponent } from './permission/permission.component';
import { UserComponent } from './user/user.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ProjectComponent } from './project/project.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
  path: 'home',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'project',
  component: ProjectComponent
}, {
  path: 'project/:id',
  component: ToDoComponent
},
{
  path: 'user',
  component: UserComponent
},
{
  path: 'user/:id',
  component: RegisterComponent
},
{
  path: 'permission',
  component: PermissionComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'report',
  component: ReportComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
