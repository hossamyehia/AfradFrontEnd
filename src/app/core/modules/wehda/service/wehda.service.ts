import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, WehdaCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Wehda from '../model/wehda.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WehdaService {

  constructor(
    private api: ApiService,
    private wehdaCacheService: WehdaCacheService
  ) {}


  getAll() {
    let wehda$ = this.wehdaCacheService.getValue();

    if (!wehda$) {
      wehda$ = this.api.get('dataentry/wehda').pipe(
        map((response: ApiResponse) => response['Data'] as Wehda[]),
        shareReplay(1)
      );

      this.wehdaCacheService.setValue(wehda$);
    }
    return wehda$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/wehda/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.wehdaCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let wehda$ = this.wehdaCacheService.getByKey("id", id );

    if (!wehda$) {
      wehda$ = this.api.get(`dataentry/wehda/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Wehda),
        shareReplay(1)
      );
    }
    return wehda$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/wehda/${id}`, newValue)
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
      this.api.delete(`dataentry/wehda/${id}`)
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
