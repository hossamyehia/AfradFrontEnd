import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataEntryRoutingModule } from './data-entry-routing.module';
import { DataentryComponent } from './pages/index.component';
import { SharedModule } from 'src/app/shared';
import { FeaPageComponent } from './pages/fea-page/fea-page.component';
import { FeaFormComponent } from './components/fea-form/fea-form.component';



@NgModule({
  declarations: [
    DataentryComponent,
    FeaPageComponent,
    FeaFormComponent
  ],
  imports: [
    CommonModule,
    DataEntryRoutingModule,
    SharedModule
  ]
})
export class DataEntryModule { }
