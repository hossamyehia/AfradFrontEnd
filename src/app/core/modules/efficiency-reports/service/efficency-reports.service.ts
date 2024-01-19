import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, EfficencyReportsCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import EfficiencyReports from '../model/efficiencyReports.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EfficencyReportsService {

  constructor(
    private api: ApiService,
    private efficiencyReportsCacheService: EfficencyReportsCacheService
  ) {}

  getAll() {
    let efficiency$ = this.efficiencyReportsCacheService.getValue();

    if (!efficiency$) {
      efficiency$ = this.api.get('dabetinfo/efficiency').pipe(
        map((response: ApiResponse) => response['Data'] as EfficiencyReports[]),
        shareReplay(1)
      );

      this.efficiencyReportsCacheService.setValue(efficiency$);
    }
    return efficiency$;
  }

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/efficiency/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.efficiencyReportsCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {

    let efficiency$ = this.efficiencyReportsCacheService.getByKey('id', id);

    if (!efficiency$) {
      efficiency$ = this.api.get(`dabetinfo/efficiency/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as EfficiencyReports),
        shareReplay(1)
      );
    }
    return efficiency$;
  }

  getByDabet(id: number) {
    let efficiency$ = this.efficiencyReportsCacheService.getByKey('dabet_id', id);

    if (!efficiency$) {
      efficiency$ = this.api.get(`dabetinfo/efficiency/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as EfficiencyReports[]),
        shareReplay(1)
      );
    }
    return efficiency$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/efficiency/${id}`, newValue).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  remove(id: number | undefined) {
    return new Promise((resolve, reject) => {
      this.api.delete(`dabetinfo/efficiency/${id}`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }
}
