import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DobatsafRoutingModule } from './dobatsaf-routing.module';
import { DobatSafComponent } from './pages/dobatsaf.component';
import { NewDabetSafComponent } from './pages/new-dabet-saf/new-dabet-saf.component';
import { ShowDabetSafComponent } from './pages/show-dabet-saf/show-dabet-saf.component';
import { SharedModule } from "../../../../shared/shared.module";
import { DabetSafComponent } from './pages/dabet-saf/dabet-saf.component';
import { RanksComponent } from './components/ranks/ranks.component';
import { RenewalsComponent } from './components/renewals/renewals.component';
import { EfficiencyReportsComponent } from './components/efficiency-reports/efficiency-reports.component';
import { RenewalsDisplayComponent } from './components/renewals-display/renewals-display.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { MissionsComponent } from './components/missions/missions.component';
import { TransportationsComponent } from './components/transportations/transportations.component';
import { SearchComponent } from './components/search/search.component';

import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
    declarations: [
        DobatSafComponent,
        NewDabetSafComponent,
        ShowDabetSafComponent,
        DabetSafComponent,
        RanksComponent,
        RenewalsComponent,
        EfficiencyReportsComponent,
        RenewalsDisplayComponent,
        SanctionsComponent,
        VacationsComponent,
        MissionsComponent,
        TransportationsComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        DobatsafRoutingModule,
        SharedModule,
        NgSelectModule
    ]
})
export class DobatsafModule { }
