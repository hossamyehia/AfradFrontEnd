import { Injectable } from '@angular/core';
import { RenewalCacheService } from '../cache/renewal-cache.service';
import { ApiService } from 'src/app/core/service';
import ApiResponse from 'src/app/core/models/api.model';
import Renewal from '../model/renewals.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(
    private api: ApiService,
    private renewalCacheService: RenewalCacheService
  ) {}

  getAll() {
    let renewal$ = this.renewalCacheService.getValue();

    if (!renewal$) {
      renewal$ = this.api.get('dabetinfo/renewal').pipe(
        map((response: ApiResponse) => response['Data'] as Renewal[]),
        shareReplay(1)
      );

      this.renewalCacheService.setValue(renewal$);
    }
    return renewal$;
  }

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/renewal/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.renewalCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {

    let renewal$ = this.renewalCacheService.getByKey('id', id);

    if (!renewal$) {
      renewal$ = this.api.get(`dabetinfo/renewal/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Renewal),
        shareReplay(1)
      );
    }
    return renewal$;
  }

  getByDabet(id: number) {
    let renewal$ = this.renewalCacheService.getByKey('dabet_id', id);

    if (!renewal$) {
      renewal$ = this.api.get(`dabetinfo/renewal/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Renewal[]),
        shareReplay(1)
      );
    }
    return renewal$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/renewal/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/renewal/${id}`).subscribe({
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
