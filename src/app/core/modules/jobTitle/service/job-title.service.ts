import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, JobTitleCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import JobTitle from '../model/jobTitle.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(
    private api: ApiService,
    private jobTitleCacheService: JobTitleCacheService
  ) {}


  getAll() {
    let jobTitle$ = this.jobTitleCacheService.getValue();

    if (!jobTitle$) {
      jobTitle$ = this.api.get('dataentry/jobTitle').pipe(
        map((response: ApiResponse) => response['Data'] as JobTitle[]),
        shareReplay(1)
      );

      this.jobTitleCacheService.setValue(jobTitle$);
    }
    return jobTitle$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/jobTitle/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.jobTitleCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let jobTitle$ = this.jobTitleCacheService.getByKey("id", id );

    if (!jobTitle$) {
      jobTitle$ = this.api.get(`dataentry/jobTitle/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as JobTitle),
        shareReplay(1)
      );
    }
    return jobTitle$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/jobTitle/${id}`, newValue)
      .subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });
  }

  remove(id:number | undefined){
    return new Promise((resolve, reject) => {
      this.api.delete(`dataentry/jobTitle/${id}`)
      .subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });
  }

}
