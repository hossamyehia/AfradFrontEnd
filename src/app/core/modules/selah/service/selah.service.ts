import { Injectable } from '@angular/core';
import { ApiService, SelahCacheService } from 'src/app/core';
import Selah from '../model/selah.model';
import { map, shareReplay } from 'rxjs';
import ApiResponse from 'src/app/core/models/api.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SelahService {

  constructor(
    private api: ApiService,
    private selahCacheService: SelahCacheService
  ) {}


  getAll() {
    let selah$ = this.selahCacheService.getValue();

    if (!selah$) {
      selah$ = this.api.get('dataentry/selah').pipe(
        map((response: ApiResponse) => response['Data'] as Selah[]),
        shareReplay(1)
      );

      this.selahCacheService.setValue(selah$);
    }
    return selah$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/selah/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.selahCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let selah$ = this.selahCacheService.getByKey("id", id );

    if (!selah$) {
      selah$ = this.api.get(`dataentry/selah/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Selah),
        shareReplay(1)
      );
    }
    return selah$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/selah/${id}`, newValue)
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
      this.api.delete(`dataentry/selah/${id}`)
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
