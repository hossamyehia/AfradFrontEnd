import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, CrimeSanctionCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import CrimeSanction from '../model/crimeSanction.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrimeSanctionService {

  constructor(
    private api: ApiService,
    private crimeSanctionCacheService: CrimeSanctionCacheService
  ) {}


  getAll() {
    let crimeSanction$ = this.crimeSanctionCacheService.getValue();

    if (!crimeSanction$) {
      crimeSanction$ = this.api.get('dataentry/crimeSanction').pipe(
        map((response: ApiResponse) => response['Data'] as CrimeSanction[]),
        shareReplay(1)
      );

      this.crimeSanctionCacheService.setValue(crimeSanction$);
    }
    return crimeSanction$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/crimeSanction/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.crimeSanctionCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let crimeSanction$ = this.crimeSanctionCacheService.getByKey("id", id );

    if (!crimeSanction$) {
      crimeSanction$ = this.api.get(`dataentry/crimeSanction/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as CrimeSanction),
        shareReplay(1)
      );
    }
    return crimeSanction$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/crimeSanction/${id}`, newValue)
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
      this.api.delete(`dataentry/crimeSanction/${id}`)
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
