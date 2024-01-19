import { Injectable } from '@angular/core';
import { ApiService, QualificationCacheService } from 'src/app/core';
import Qualification from '../model/qualification.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  /*
  qualification$: Qualification[] = [
    {
      "id": 1,
      "name": "راسب اعدادية"
    },
    {
      "id": 2,
      "name": "اعدادية"
    },
    {
      "id": 3,
      "name": "د زراعة"
    },
    {
      "id": 4,
      "name": "موسيقى"
    },
    {
      "id": 5,
      "name": "د صنايع"
    },
    {
      "id": 6,
      "name": "د ص أفران حرارية"
    },
    {
      "id": 7,
      "name": "د ص لحام"
    },
    {
      "id": 8,
      "name": "د ص خراطة"
    },
    {
      "id": 9,
      "name": "د ص برادة"
    },
    {
      "id": 10,
      "name": "د ص جودة إنتاج"
    },
    {
      "id": 11,
      "name": "رقابة وجودة"
    },
    {
      "id": 12,
      "name": "د ص أعمال صاج"
    },
    {
      "id": 13,
      "name": "د تلمذة صناعية"
    },
    {
      "id": 14,
      "name": "بحرية وبناء سفن"
    },
    {
      "id": 15,
      "name": "أجهزة وبصريات"
    },
    {
      "id": 16,
      "name": "د ص كهرباء"
    },
    {
      "id": 17,
      "name": "د مصاعد كهربائية"
    },
    {
      "id": 18,
      "name": "د شبكات كهربائية"
    },
    {
      "id": 19,
      "name": "د ص لاسلكي"
    },
    {
      "id": 20,
      "name": "الكترونيات فقط"
    },
    {
      "id": 21,
      "name": "تحاليل كيماوية"
    },
    {
      "id": 22,
      "name": "د ص ميكا عام وقوى"
    },
    {
      "id": 23,
      "name": "تشغيل ماكينات"
    },
    {
      "id": 24,
      "name": "ميكا غزل"
    },
    {
      "id": 25,
      "name": "د ص سيارات"
    },
    {
      "id": 26,
      "name": "كهربائي سيارات"
    },
    {
      "id": 27,
      "name": "جرارات زراعية"
    },
    {
      "id": 28,
      "name": "د ص نجارة"
    },
    {
      "id": 29,
      "name": "عمارة ورسم معماري"
    },
    {
      "id": 30,
      "name": "بناء"
    },
    {
      "id": 31,
      "name": "أوناش"
    },
    {
      "id": 32,
      "name": "آلات رفع"
    },
    {
      "id": 33,
      "name": "فرم خرسانية"
    },
    {
      "id": 34,
      "name": "د خرسانة مسلحة"
    },
    {
      "id": 35,
      "name": "د بياض"
    },
    {
      "id": 36,
      "name": "د نقش وزخرفة"
    },
    {
      "id": 37,
      "name": "د رسم وتصوير"
    },
    {
      "id": 38,
      "name": "د تبريد وتكييف"
    },
    {
      "id": 39,
      "name": "د سباكة"
    },
    {
      "id": 40,
      "name": "د تجليد وطباعة"
    },
    {
      "id": 41,
      "name": "د نسيج"
    },
    {
      "id": 42,
      "name": "صحي وإسعاف"
    },
    {
      "id": 43,
      "name": "سياحة وفنادق"
    },
    {
      "id": 44,
      "name": "ديكور"
    },
    {
      "id": 45,
      "name": "راديو وتليفزيون"
    },
    {
      "id": 46,
      "name": "علاقات صناعية"
    },
    {
      "id": 47,
      "name": "مجال صناعي"
    },
    {
      "id": 48,
      "name": "مساحة"
    },
    {
      "id": 49,
      "name": "خدمة اجتماعية"
    },
    {
      "id": 50,
      "name": "آثار"
    },
    {
      "id": 51,
      "name": "ترميم اثار"
    },
    {
      "id": 52,
      "name": "قراءات"
    },
    {
      "id": 53,
      "name": "اكليكي"
    },
    {
      "id": 54,
      "name": "د تجارة"
    },
    {
      "id": 55,
      "name": "ثانوية عامة"
    },
    {
      "id": 56,
      "name": "د بريد"
    },
    {
      "id": 57,
      "name": "د بلاستيك"
    },
    {
      "id": 58,
      "name": "د تحسين خطوط"
    },
    {
      "id": 59,
      "name": "د دهان و سمكرة"
    },
    {
      "id": 60,
      "name": "د سيراميك"
    },
    {
      "id": 61,
      "name": "د زيوت و صابون"
    },
    {
      "id": 62,
      "name": "د سجاد و كليم"
    },
    {
      "id": 63,
      "name": "د الوميتال"
    },
    {
      "id": 64,
      "name": "د بترول و تعدين و تكرير"
    },
    {
      "id": 65,
      "name": "د حواسب / مبارك كول"
    },
    {
      "id": 66,
      "name": "د كهرباء / مبارك كول"
    },
    {
      "id": 67,
      "name": "د ميكا عام / مبارك كول"
    },
    {
      "id": 68,
      "name": "د لاسلكى / مبارك كول"
    },
    {
      "id": 69,
      "name": "د معدات ثقيلة / مبارك كول"
    },
    {
      "id": 70,
      "name": "د ص تصميم مركزى"
    },
    {
      "id": 71,
      "name": "د ص حواسب"
    },
    {
      "id": 72,
      "name": "د جلود و أحذية"
    },
    {
      "id": 73,
      "name": "د خط عربى"
    },
    {
      "id": 74,
      "name": "د نحت"
    },
    {
      "id": 75,
      "name": "د حركة و نقل"
    },
    {
      "id": 76,
      "name": "اشارات سكة حديد"
    },
    {
      "id": 77,
      "name": "اعمال بلوك"
    },
    {
      "id": 78,
      "name": "ملابس جاهزة"
    },
    {
      "id": 79,
      "name": "صباغة و تجهيز منسوجات"
    },
    {
      "id": 80,
      "name": "وحدات الومنيوم"
    },
    {
      "id": 81,
      "name": "هياكل سيارات"
    },
    {
      "id": 82,
      "name": "د ص تركيبات ميكانيكية"
    },
    {
      "id": 83,
      "name": "د ص زجاج"
    },
    {
      "id": 84,
      "name": "فنى صناعى"
    },
    {
      "id": 85,
      "name": "عليا"
    },
    {
      "id": 86,
      "name": "فنى تجارى"
    },
    {
      "id": 87,
      "name": "د ص ميكانيكا"
    },
    {
      "id": 88,
      "name": "د ص نجارة اثاث"
    },
    {
      "id": 89,
      "name": "د تركيبات"
    },
    {
      "id": 90,
      "name": "د تشغيل معادن"
    },
    {
      "id": 91,
      "name": "د مشغولات حديد"
    },
    {
      "id": 92,
      "name": "د تمريض"
    },
    {
      "id": 93,
      "name": "د ص عمارة"
    },
    {
      "id": 94,
      "name": "ث ازهرية"
    },
    {
      "id": 95,
      "name": "د ص معدات"
    },
    {
      "id": 96,
      "name": "د معدات كهربائية"
    },
    {
      "id": 97,
      "name": "د ص اثاث معدنى"
    }
  ];
  */

  constructor(
    private api: ApiService,
    private qualificationCacheService: QualificationCacheService
  ) {
  }


  getAll() {

    let qualification$ = this.qualificationCacheService.getValue();

    if (!qualification$) {
      qualification$ = this.api.get('dataentry/qualification').pipe(
        map((response: ApiResponse) => response['Data'] as Qualification[]),
        shareReplay(1)
      );

      this.qualificationCacheService.setValue(qualification$);
    }
    return qualification$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/qualification/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.qualificationCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    //let qualification$ = this.qualification$.find((data: any) => (data["id"]).toString() === id.toString());

    let qualification$ = this.qualificationCacheService.getByKey("id", id );

    if (!qualification$) {
      qualification$ = this.api.get(`dataentry/qualification/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Qualification),
        shareReplay(1)
      );
    }

    return qualification$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/qualification/${id}`, newValue)
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
      this.api.delete(`dataentry/qualification/${id}`)
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
