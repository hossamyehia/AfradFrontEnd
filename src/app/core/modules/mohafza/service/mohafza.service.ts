import { Injectable } from '@angular/core';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { ApiService, MohafzaCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Mohafza from '../model/mohafza.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MohafzaService {
  /*
  mohafzat$: Mohafza[] = [
    { id: 1, name: 'القاهره' },
    { id: 2, name: 'الاسكندرية' },
    { id: 3, name: 'بور سعيد' },
    { id: 4, name: 'السويس' },
    { id: 5, name: 'دمياط' },
    { id: 6, name: 'الدقهلية' },
    { id: 7, name: 'الشرقية' },
    { id: 8, name: 'القليوبية' },
    { id: 9, name: 'كفر الشيخ' },
    { id: 10, name: 'الغربية' },
    { id: 11, name: 'المنوفية' },
    { id: 12, name: 'البحيرة' },
    { id: 13, name: 'الاسماعيلية' },
    { id: 14, name: 'الجيزه' },
    { id: 15, name: 'بني سويف' },
    { id: 16, name: 'الفيوم' },
    { id: 17, name: 'المنيا' },
    { id: 18, name: 'اسيوط' },
    { id: 19, name: 'سوهاج' },
    { id: 20, name: 'قنا' },
    { id: 21, name: 'اسوان' },
    { id: 22, name: 'الاقصر' },
    { id: 23, name: 'البحر الاحمر' },
    { id: 24, name: 'الوادي الجديد' },
    { id: 25, name: 'مرسى مطروح' },
    { id: 26, name: 'سيناء الشمالية' },
    { id: 27, name: 'سيناء الجنوبية' },
  ];
*/
  constructor(
    private api: ApiService,
    private mohafzaCacheService: MohafzaCacheService
  ) {}

  getAll() {
    let mohafzat$ = this.mohafzaCacheService.getValue();

    if (!mohafzat$) {
      mohafzat$ = this.api.get('dataentry/mohafza').pipe(
        map((response: ApiResponse) => response['Data'] as Mohafza[]),
        shareReplay(1)
      );

      this.mohafzaCacheService.setValue(mohafzat$);
    }
    return mohafzat$;
  }

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/mohafza/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.mohafzaCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    /*
    let mohafza$ = this.mohafzat$.find(
      (data: any) => data['id'].toString() === id.toString()
    );
    **/

    let mohafza$ = this.mohafzaCacheService.getByKey('id', id);

    if (!mohafza$) {
      mohafza$ = this.api.get(`dataentry/mohafza/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Mohafza),
        shareReplay(1)
      );
    }
    return mohafza$;
  }
  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/mohafza/${id}`, newValue).subscribe({
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
      this.api.delete(`dataentry/mohafza/${id}`).subscribe({
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
