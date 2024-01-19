import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, FeaClassCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import FeaClass from '../model/fealClass.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeaClassService {

  constructor(
    private api: ApiService,
    private feaClassCacheService: FeaClassCacheService
  ) {}


  getAll() {
    let feaClass$ = this.feaClassCacheService.getValue();

    if (!feaClass$) {
      feaClass$ = this.api.get('dataentry/feaClass').pipe(
        map((response: ApiResponse) => response['Data'] as FeaClass[]),
        shareReplay(1)
      );

      this.feaClassCacheService.setValue(feaClass$);
    }
    return feaClass$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/feaClass/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.feaClassCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let feaClass$ = this.feaClassCacheService.getByKey("id", id );

    if (!feaClass$) {
      feaClass$ = this.api.get(`dataentry/feaClass/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as FeaClass),
        shareReplay(1)
      );
    }
    return feaClass$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/feaClass/${id}`, newValue)
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
      this.api.delete(`dataentry/feaClass/${id}`)
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
