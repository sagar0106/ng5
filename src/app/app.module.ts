import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermissionComponent } from './permission/permission.component';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { ToDoComponent } from './to-do/to-do.component';
import { UserComponent } from './user/user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { DataService } from '../services/data.service';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent } from './report/report.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { GridComponent } from './report/grid/grid.component';
import { PieComponent } from './report/pie/pie.component';
import { LineComponent } from './report/line/line.component';
import { BarComponent } from './report/bar/bar.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PermissionComponent,
    ProjectComponent,
    RegisterComponent,
    ToDoComponent,
    UserComponent,
    NavBarComponent,
    ProjectModalComponent,
    ReportComponent,
    GridComponent,
    PieComponent,
    LineComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    DxDataGridModule,
    DxPieChartModule,
    DxChartModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
