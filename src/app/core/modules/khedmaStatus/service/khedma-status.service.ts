import { Injectable } from '@angular/core';
import { ApiService, KhedmaStatusCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import KhedmaStatus from '../model/index.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KhedmaStatusService {
  /*
  khedmaStatus$: KhedmaStatus[] = [
    {
      "id": 1,
      "name": "بالخدمة"
    },
    {
      "id": 2,
      "name": "غياب"
    },
    {
      "id": 3,
      "name": "شطب من القوة"
    },
    {
      "id": 4,
      "name": "المادة 109"
    },
    {
      "id": 5,
      "name": "عدم اللياقة الطبية"
    },
    {
      "id": 6,
      "name": "الترقي ملازم"
    },
    {
      "id": 7,
      "name": "الوفاة"
    },
    {
      "id": 8,
      "name": "عدم الرغبة فى التجديد"
    },
    {
      "id": 9,
      "name": "استقالة"
    },
    {
      "id": 10,
      "name": "عدم الصلاحية الفنية"
    },
    {
      "id": 11,
      "name": "سوء سلوك"
    },
    {
      "id": 12,
      "name": "بلوغ السن القانوني"
    },
    {
      "id": 13,
      "name": "دواعي الصالح العام"
    },
    {
      "id": 14,
      "name": "إنهاء التكليف"
    },
    {
      "id": 15,
      "name": "إنهاء الإستدعاء"
    },
    {
      "id": 16,
      "name": "عدم التصديق علي التجديد"
    },
    {
      "id": 17,
      "name": "نقل لوظيفة مدنية"
    }
  ]
  */
  constructor(
    private api: ApiService,
    private khedmaStatusCacheService: KhedmaStatusCacheService
  ) {}


  getAll() {
    let khedmaStatus$ = this.khedmaStatusCacheService.getValue();

    if (!khedmaStatus$) {
      khedmaStatus$ = this.api.get('dataentry/khedmaStatus').pipe(
        map((response: ApiResponse) => response['Data'] as KhedmaStatus[]),
        shareReplay(1)
      );

      this.khedmaStatusCacheService.setValue(khedmaStatus$);
    }

    return khedmaStatus$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/KhedmaStatus/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.khedmaStatusCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let KhedmaStatus$ = this.khedmaStatusCacheService.getByKey( "id", id );

    if (!KhedmaStatus$) {
      KhedmaStatus$ = this.api.get(`dataentry/KhedmaStatus/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as KhedmaStatus),
        shareReplay(1)
      );
    }
    return KhedmaStatus$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/KhedmaStatus/${id}`, newValue)
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
      this.api.delete(`dataentry/KhedmaStatus/${id}`)
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
