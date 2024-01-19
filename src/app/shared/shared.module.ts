import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent, FooterComponent } from './layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageComponent, TableComponent } from './components';
import { SelectComponent } from './components/select/select.component';

import { NgSelectModule } from "@ng-select/ng-select";

import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
    NgSelectModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    MessageComponent,
    TableComponent,
    SelectComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent, FooterComponent, MessageComponent, TableComponent, SelectComponent
  ]
})
export class SharedModule { }
