import { Injectable } from '@angular/core';
import { ApiService, DaragaCacheService } from 'src/app/core';
import Daraga from '../model/daraga.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DaragaService {


  constructor(
    private api: ApiService,
    private daragaCacheService: DaragaCacheService
  ) {}


  getAll() {
    let daraga$ = this.daragaCacheService.getValue();

    if (!daraga$) {
      daraga$ = this.api.get('dataentry/daraga').pipe(
        map((response: ApiResponse) => response['Data'] as Daraga[]),
        shareReplay(1)
      );

      this.daragaCacheService.setValue(daraga$);
    }
    return daraga$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/daraga/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.daragaCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let daraga$ = this.daragaCacheService.getByKey("id", id );

    if (!daraga$) {
      daraga$ = this.api.get(`dataentry/daraga/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Daraga),
        shareReplay(1)
      );
    }
    return daraga$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/daraga/${id}`, newValue)
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
      this.api.delete(`dataentry/daraga/${id}`)
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
