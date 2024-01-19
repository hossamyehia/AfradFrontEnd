import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DobatSafComponent } from './pages/dobatsaf.component';
import { NewDabetSafComponent } from './pages/new-dabet-saf/new-dabet-saf.component';
import { ShowDabetSafComponent } from './pages/show-dabet-saf/show-dabet-saf.component';
import { DabetSafComponent } from './pages/dabet-saf/dabet-saf.component';

const routes: Routes = [
  {
    path: '',
    component: DobatSafComponent,
    children: [
      {
        path: '',
        component: ShowDabetSafComponent
      },
      {
        path: 'addedit',
        component: NewDabetSafComponent,
      },
      {
        path: ':id',
        component: DabetSafComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DobatsafRoutingModule { }
