import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { DobatSafCacheService } from '../cache/dobat-saf-cache.service';
import DobatSaf from '../model/dobatSaf.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DobatSafService {

  constructor(
    private api: ApiService,
    private dobatSafCacheService: DobatSafCacheService
  ) {}



  getAll() {
    let dobatSaf$ = this.dobatSafCacheService.getValue();

    if (!dobatSaf$) {
      dobatSaf$ = this.api.get('dobatsaf').pipe(
        map((response: ApiResponse) => response['Data'] as DobatSaf[]),
        shareReplay(1)
      );

      this.dobatSafCacheService.setValue(dobatSaf$);
    }
    return dobatSaf$;
  }

  getBySelah(selah_id: number) {
    let dobatSaf$ = this.dobatSafCacheService.getValue(`selah_${selah_id}`);

    if (!dobatSaf$) {
      dobatSaf$ = this.api.get(`dobatsaf/selah/${selah_id}`).pipe(
        map((response: ApiResponse) => response['Data'] as DobatSaf[]),
        shareReplay(1)
      );

      this.dobatSafCacheService.setValue(dobatSaf$, `selah_${selah_id}`);
    }
    return dobatSaf$;
  }

  getByWehda(wehda_id: number) {
    let dobatSaf$ = this.dobatSafCacheService.getValue(`wehda_${wehda_id}`);

    if (!dobatSaf$) {
      dobatSaf$ = this.api.get(`dobatsaf/wehda/${wehda_id}`).pipe(
        map((response: ApiResponse) => response['Data'] as DobatSaf[]),
        shareReplay(1)
      );

      this.dobatSafCacheService.setValue(dobatSaf$, `wehda_${wehda_id}`);
    }
    return dobatSaf$;
  }

  getByDaraga(daraga_id: number) {
    let dobatSaf$ = this.dobatSafCacheService.getValue(`daraga_${daraga_id}`);

    if (!dobatSaf$) {
      dobatSaf$ = this.api.get(`dobatsaf/daraga/${daraga_id}`).pipe(
        map((response: ApiResponse) => response['Data'] as DobatSaf[]),
        shareReplay(1)
      );

      this.dobatSafCacheService.setValue(dobatSaf$, `daraga_${daraga_id}`);
    }
    return dobatSaf$;
  }

  getByFea(fea_id: number) {
    let dobatSaf$ = this.dobatSafCacheService.getValue(`fea_${fea_id}`);

    if (!dobatSaf$) {
      dobatSaf$ = this.api.get(`dobatsaf/fea/${fea_id}`).pipe(
        map((response: ApiResponse) => response['Data'] as DobatSaf[]),
        shareReplay(1)
      );

      this.dobatSafCacheService.setValue(dobatSaf$, `fea_${fea_id}`);
    }
    return dobatSaf$;
  }

  addDabetSaf(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dobatsaf/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.dobatSafCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let dabetSaf$ = this.dobatSafCacheService.getByKey( "id", id );

    if (!dabetSaf$) {
      dabetSaf$ = this.api.get(`dobatsaf/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as DobatSaf),
        shareReplay(1)
      );
    }
    return dabetSaf$;
  }

  getByRkmAskry(rkmaskry: number) {
    let dabetSaf$ = this.dobatSafCacheService.getByKey( "rkmaskry", rkmaskry );

    if (!dabetSaf$) {
      dabetSaf$ = this.api.get(`dobatsaf/rkmaskry/${rkmaskry}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as DobatSaf),
        shareReplay(1)
      );
    }
    return dabetSaf$;
  }

  editDabetSaf(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dobatsaf/${id}`, newValue)
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

  removeDabetSaf(id:number | undefined){
    return new Promise((resolve, reject) => {
      this.api.delete(`dobatsaf/${id}`)
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
