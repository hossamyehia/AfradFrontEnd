import { Injectable } from '@angular/core';
import EfficiencyReports from '../model/efficiencyReports.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class EfficencyReportsCacheService extends AbstractCacheService<EfficiencyReports[]> {

}
