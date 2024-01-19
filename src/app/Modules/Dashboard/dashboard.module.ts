import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { RolesComponent } from './pages/roles/roles.component';
import { RoleFormComponent } from './components/forms/role-form/role-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    DashboardHeaderComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    RolesComponent,
    RoleFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
