import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataentryComponent } from './pages/index.component';
import { FeaPageComponent } from './pages/fea-page/fea-page.component';

const routes: Routes = [
  {
    path: '',
    component: DataentryComponent,
    children: [
      
      {
        path: 'fea',
        component: FeaPageComponent
      },
      /*
      {
        path: 'addedit',
        component: NewDabetSafComponent,
      },
      {
        path: ':id',
        component: DabetSafComponent,
      },
      */
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataEntryRoutingModule { }
