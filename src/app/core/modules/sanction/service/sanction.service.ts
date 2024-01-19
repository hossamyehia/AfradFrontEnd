import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, SanctionCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Sanction from '../model/sanctions.model';

@Injectable({
  providedIn: 'root'
})
export class SanctionService {
  constructor(
    private api: ApiService,
    private sanctionCacheService: SanctionCacheService
  ) {}

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/sanction/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.sanctionCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getAll() {
    let sanction$ = this.sanctionCacheService.getValue();

    if (!sanction$) {
      sanction$ = this.api.get('dabetinfo/sanction').pipe(
        map((response: ApiResponse) => response['Data'] as Sanction[]),
        shareReplay(1)
      );

      this.sanctionCacheService.setValue(sanction$);
    }
    return sanction$;
  }

  getById(id: number) {

    let sanction$ = this.sanctionCacheService.getByKey('id', id);

    if (!sanction$) {
      sanction$ = this.api.get(`dabetinfo/sanction/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Sanction),
        shareReplay(1)
      );
    }
    return sanction$;
  }

  getByDabet(id: number) {
    let sanction$ = this.sanctionCacheService.getByKey('dabet_id', id);

    if (!sanction$) {
      sanction$ = this.api.get(`dabetinfo/sanction/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Sanction[]),
        shareReplay(1)
      );
    }
    return sanction$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/sanction/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/sanction/${id}`).subscribe({
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
