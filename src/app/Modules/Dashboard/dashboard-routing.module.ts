import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dobatsaf',
        loadChildren: () => import('./sub-modules/dobatSaf/dobatsaf.module').then(m => m.DobatsafModule)
      },
      {
        path: 'dataentry',
        loadChildren: () => import('./sub-modules/data-entry/data-entry.module').then(m => m.DataEntryModule)
      },
      {
        path: 'user',
        component: UsersComponent,
      },
      {
        path: 'role',
        component: RolesComponent,
      },
      /*
      {
        path: 'document/:id',
        component: DocumentDetailsComponent
      },
      {
        path: 'dataentry/:datatype',
        component: DataEntryComponent,
        canLoad: [RoleGuard]
      },
      */
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
