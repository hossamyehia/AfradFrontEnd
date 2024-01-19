import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { MissionCacheService } from '../cache/mission-cache.service';
import ApiResponse from 'src/app/core/models/api.model';
import { HttpErrorResponse } from '@angular/common/http';
import Mission from '../model/missions.model';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor(
    private api: ApiService,
    private missionCacheService: MissionCacheService
  ) {}

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/mission/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.missionCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getAll() {
    let mission$ = this.missionCacheService.getValue();

    if (!mission$) {
      mission$ = this.api.get('dabetinfo/mission').pipe(
        map((response: ApiResponse) => response['Data'] as Mission[]),
        shareReplay(1)
      );

      this.missionCacheService.setValue(mission$);
    }
    return mission$;
  }

  getById(id: number) {

    let mission$ = this.missionCacheService.getByKey('id', id);

    if (!mission$) {
      mission$ = this.api.get(`dabetinfo/mission/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Mission),
        shareReplay(1)
      );
    }
    return mission$;
  }

  getByDabet(id: number) {
    let mission$ = this.missionCacheService.getByKey('dabet_id', id);

    if (!mission$) {
      mission$ = this.api.get(`dabetinfo/mission/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Mission[]),
        shareReplay(1)
      );
    }
    return mission$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/mission/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/mission/${id}`).subscribe({
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
