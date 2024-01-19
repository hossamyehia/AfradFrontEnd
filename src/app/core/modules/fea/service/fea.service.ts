import { Injectable } from '@angular/core';
import { ApiService, FeaCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Fea from '../model/fea.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeaService {

  constructor(
    private api: ApiService,
    private feaCacheService: FeaCacheService
  ) {}


  getAll() {
    let fea$ = this.feaCacheService.getValue();

    if (!fea$) {
      fea$ = this.api.get('dataentry/fea').pipe(
        map((response: ApiResponse) => response['Data'] as Fea[]),
        shareReplay(1)
      );

      this.feaCacheService.setValue(fea$);
    }
    return fea$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/fea/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.feaCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let fea$ = this.feaCacheService.getByKey("id", id );

    if (!fea$) {
      fea$ = this.api.get(`dataentry/fea/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Fea),
        shareReplay(1)
      );
    }
    return fea$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/fea/${id}`, newValue)
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
      this.api.delete(`dataentry/fea/${id}`)
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
