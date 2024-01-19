import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, TransportationCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Transportation from '../model/transportation.model';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  constructor(
    private api: ApiService,
    private transportationCacheService: TransportationCacheService
  ) {}

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/transportation/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.transportationCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getAll() {
    let transportation$ = this.transportationCacheService.getValue();

    if (!transportation$) {
      transportation$ = this.api.get('dabetinfo/transportation').pipe(
        map((response: ApiResponse) => response['Data'] as Transportation[]),
        shareReplay(1)
      );

      this.transportationCacheService.setValue(transportation$);
    }
    return transportation$;
  }

  getById(id: number) {

    let transportation$ = this.transportationCacheService.getByKey('id', id);

    if (!transportation$) {
      transportation$ = this.api.get(`dabetinfo/transportation/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Transportation),
        shareReplay(1)
      );
    }
    return transportation$;
  }

  getByDabet(id: number) {
    let transportation$ = this.transportationCacheService.getByKey('dabet_id', id);

    if (!transportation$) {
      transportation$ = this.api.get(`dabetinfo/transportation/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Transportation[]),
        shareReplay(1)
      );
    }
    return transportation$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/transportation/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/transportation/${id}`).subscribe({
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
