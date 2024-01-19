import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, VacationCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Vacation from '../model/vacations.model';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  constructor(
    private api: ApiService,
    private vacationCacheService: VacationCacheService
  ) {}

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/vacation/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.vacationCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getAll() {
    let vacation$ = this.vacationCacheService.getValue();

    if (!vacation$) {
      vacation$ = this.api.get('dabetinfo/vacation').pipe(
        map((response: ApiResponse) => response['Data'] as Vacation[]),
        shareReplay(1)
      );

      this.vacationCacheService.setValue(vacation$);
    }
    return vacation$;
  }

  getById(id: number) {

    let vacation$ = this.vacationCacheService.getByKey('id', id);

    if (!vacation$) {
      vacation$ = this.api.get(`dabetinfo/vacation/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Vacation),
        shareReplay(1)
      );
    }
    return vacation$;
  }

  getByDabet(id: number) {
    let vacation$ = this.vacationCacheService.getByKey('dabet_id', id);

    if (!vacation$) {
      vacation$ = this.api.get(`dabetinfo/vacation/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Vacation[]),
        shareReplay(1)
      );
    }
    return vacation$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/vacation/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/vacation/${id}`).subscribe({
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
