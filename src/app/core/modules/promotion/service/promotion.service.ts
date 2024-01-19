import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { PromotionCacheService } from '../cache/promotion-cache.service';
import Promotion from '../model/promotion.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private api: ApiService,
    private promotionCacheService: PromotionCacheService
  ) {}

  getAll() {
    let promotion$ = this.promotionCacheService.getValue();

    if (!promotion$) {
      promotion$ = this.api.get('dabetinfo/promotion').pipe(
        map((response: ApiResponse) => response['Data'] as Promotion[]),
        shareReplay(1)
      );

      this.promotionCacheService.setValue(promotion$);
    }
    return promotion$;
  }

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dabetinfo/promotion/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.promotionCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {

    let Promotion$ = this.promotionCacheService.getByKey('id', id);

    if (!Promotion$) {
      Promotion$ = this.api.get(`dabetinfo/promotion/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Promotion),
        shareReplay(1)
      );
    }
    return Promotion$;
  }

  getByDabet(id: number) {
    let Promotion$ = this.promotionCacheService.getByKey('dabet_id', id);

    if (!Promotion$) {
      Promotion$ = this.api.get(`dabetinfo/promotion/dabet/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Promotion[]),
        shareReplay(1)
      );
    }
    return Promotion$;
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dabetinfo/promotion/${id}`, newValue).subscribe({
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
      this.api.delete(`dabetinfo/promotion/${id}`).subscribe({
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
