import { Injectable } from '@angular/core';
import { CrimeTypeCacheService, ApiService } from 'src/app/core';
import CrimeType from '../model/crimeType.model';
import { map, shareReplay } from 'rxjs';
import ApiResponse from 'src/app/core/models/api.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrimeTypeService {

  constructor(
    private api: ApiService,
    private crimeTypeCacheService: CrimeTypeCacheService
  ) {}


  getAll() {
    let crimeType$ = this.crimeTypeCacheService.getValue();

    if (!crimeType$) {
      crimeType$ = this.api.get('dataentry/crimeType').pipe(
        map((response: ApiResponse) => response['Data'] as CrimeType[]),
        shareReplay(1)
      );

      this.crimeTypeCacheService.setValue(crimeType$);
    }
    return crimeType$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/crimeType/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.crimeTypeCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let crimeType$ = this.crimeTypeCacheService.getByKey("id", id );

    if (!crimeType$) {
      crimeType$ = this.api.get(`dataentry/crimeType/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as CrimeType),
        shareReplay(1)
      );
    }
    return crimeType$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/crimeType/${id}`, newValue)
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
      this.api.delete(`dataentry/crimeType/${id}`)
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
