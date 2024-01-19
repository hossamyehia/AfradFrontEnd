import { Injectable } from '@angular/core';
import { ApiService, MarkazCacheService } from 'src/app/core';
import Markaz from '../model/markaz.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkazService {
/*
  markaz$: Markaz[] = [
    {
      id: 1,
      name: "ابشواي",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 2,
      name: "ابنوب",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 3,
      name: "ابو المطامير",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 4,
      name: "ابوتيج",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 5,
      name: "ابو حماد",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 6,
      name: "ابو حمص",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 7,
      name: "ابو طشط",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 8,
      name: "ابو قرقاص",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 9,
      name: "ابو كبير",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 10,
      name: "اجا",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 11,
      name: "اخميم",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 12,
      name: "ادفو",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 13,
      name: "ارمنت",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 14,
      name: "اسنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 15,
      name: "بندر اسوان",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 16,
      name: "مركز اسوان",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 17,
      name: "مركز اسيوط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 18,
      name: "اشمون",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 19,
      name: "اطسا",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 20,
      name: "الازبكية الفجالة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 21,
      name: "الاقصر",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 22,
      name: "الباجور",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 23,
      name: "البداري",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 24,
      name: "البدراشين",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 25,
      name: "البرلوس",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 26,
      name: "قسم الاسماعيلية",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 27,
      name: "البلينا",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 28,
      name: "الجمالية",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 29,
      name: "الجمرك",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 30,
      name: "مركز الجيزة",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 31,
      name: "الحمام",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 32,
      name: "الحسنية",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 33,
      name: "الخارجة",
      mohafza_id: 24,
      mohafza: "الوادي الجديد"
    },
    {
      id: 34,
      name: "الخانكة",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 35,
      name: "الخليفة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 36,
      name: "الداخلة",
      mohafza_id: 24,
      mohafza: "الوادي الجديد"
    },
    {
      id: 37,
      name: "الدخيلة",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 38,
      name: "الدرب الاحمر",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 39,
      name: "الدلنجات",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 40,
      name: "الرمل",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 41,
      name: "قسم اول الزقازيق",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 42,
      name: "مركز الزقازيق",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 43,
      name: "الزيتون",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 44,
      name: "الساحل",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 45,
      name: "السلوم",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 46,
      name: "السنبلاوين",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 47,
      name: "السنطة",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 48,
      name: "مركز السويس",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 49,
      name: "السيدة زينب",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 50,
      name: "الشط",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 51,
      name: "الشهداء",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 52,
      name: "الشيخ زويد",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 53,
      name: "الصف",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 54,
      name: "الضبعة",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 55,
      name: "ضواحي الاسماعيلية",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 56,
      name: "صالحيه جديدة",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 57,
      name: "الطور",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 58,
      name: "الظاهر القاهرة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 59,
      name: "دمياط  جديده",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 60,
      name: "العدواة",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 61,
      name: "العريش",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 62,
      name: "العطارين",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 63,
      name: "العياط",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 64,
      name: "الغردقة",
      mohafza_id: 23,
      mohafza: "البحر الاحمر"
    },
    {
      id: 65,
      name: "الفشن",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 66,
      name: "بندر الفيوم",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 67,
      name: "مركز الفيوم",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 68,
      name: "القصير",
      mohafza_id: 23,
      mohafza: "البحر الاحمر"
    },
    {
      id: 69,
      name: "القنطرة شرق",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 70,
      name: "القنطرة غرب",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 71,
      name: "الحوصير",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 72,
      name: "اللبان",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 73,
      name: "قسم اول المحلة",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 74,
      name: "مركز المحلة",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 75,
      name: "المحمودية",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 76,
      name: "المراغة",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 77,
      name: "المطرية",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 78,
      name: "المعادى",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 79,
      name: "المنتزة",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 80,
      name: "المنزلة",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 81,
      name: "المنشاه",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 82,
      name: "المنشية",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 83,
      name: "المنصورة",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 84,
      name: "بندر المنيا",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 85,
      name: "مركز المنيا",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 86,
      name: "الموسكى",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 87,
      name: "الوحات البحرية",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 88,
      name: "الواسطى",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 89,
      name: "الوايلي العباسية",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 90,
      name: "مركز امبابة",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 91,
      name: "اهناسيا",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 92,
      name: "اول اسيوط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 93,
      name: "اول الجيزة",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 94,
      name: "اول المنصورة",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 95,
      name: "اول طنطا",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 96,
      name: "اولاد طوق شرق",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 97,
      name: "ايتاى البارود",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 98,
      name: "باب الشعرية",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 99,
      name: "باب شرق",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 100,
      name: "ببا",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 101,
      name: "برج العرب",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 102,
      name: "بسيون",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 103,
      name: "بلبيس",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 104,
      name: "بلقياس",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 105,
      name: "بنها بندر",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 106,
      name: "بنها مركز",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 107,
      name: "بندر بني سويف",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 108,
      name: "مركز بني سويف",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 109,
      name: "بني مزار",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 110,
      name: "مركز بور سعيد",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 111,
      name: "مركز ناصر",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 112,
      name: "بولاق",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 113,
      name: "بير العبد",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 114,
      name: "بيلا",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 115,
      name: "تلا",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 116,
      name: "ثاني اسيوط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 117,
      name: "الدقي",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 118,
      name: "ثاني المنصورة",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 119,
      name: "ثاني طنطا",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 120,
      name: "مركز جرجا",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 121,
      name: "حاجر اسوان",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 122,
      name: "سفاجا",
      mohafza_id: 23,
      mohafza: "البحر الاحمر"
    },
    {
      id: 123,
      name: "حلوان",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 124,
      name: "حوش عيسى",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 125,
      name: "مركز دسوق",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 126,
      name: "دشنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 127,
      name: "دكرنش",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 128,
      name: "بندر دمنهور",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 129,
      name: "مركز دمنهور",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 130,
      name: "بندر دمياط",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 131,
      name: "مركز دمياط",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 132,
      name: "ديرب نجم",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 133,
      name: "دير مواس",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 134,
      name: "ديروط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 135,
      name: "راس غارب",
      mohafza_id: 23,
      mohafza: "البحر الاحمر"
    },
    {
      id: 136,
      name: "رشيد",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 137,
      name: "روض الفرج",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 138,
      name: "زفتي",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 139,
      name: "سافلته",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 140,
      name: "سمالوط",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 141,
      name: "سمسطا",
      mohafza_id: 15,
      mohafza: "بني سويف"
    },
    {
      id: 142,
      name: "سمنود",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 143,
      name: "سنورس",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 144,
      name: "بندر سوهاج",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 145,
      name: "مركز سوهاج",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 146,
      name: "سيدى براني",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 147,
      name: "سيدي سالم",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 148,
      name: "سيوه",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 149,
      name: "شبرا الخيمه بندر",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 150,
      name: "قسم شبرا",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 151,
      name: "شبراخيت",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 152,
      name: "شبين القناطر",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 153,
      name: "بندر شبين الكوم",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 154,
      name: "مركز شبين الكوم",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 155,
      name: "شربين",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 156,
      name: "صدفا",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 157,
      name: "طاميه",
      mohafza_id: 16,
      mohafza: "الفيوم"
    },
    {
      id: 158,
      name: "طلخا",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 159,
      name: "حاما",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 160,
      name: "طنطا",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 161,
      name: "طهطا",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 162,
      name: "طوخ",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 163,
      name: "عابدين",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 164,
      name: "عتاقه",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 165,
      name: "نصر",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 166,
      name: "فارسكور",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 167,
      name: "فاقوس",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 168,
      name: "دوه",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 169,
      name: "قصر النيل",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 170,
      name: "قطور",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 171,
      name: "قيلين",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 172,
      name: "قليوب",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 173,
      name: "بندر قنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 174,
      name: "مركز قنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 175,
      name: "دوس",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 176,
      name: "قويسنا",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 177,
      name: "كرموز",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 178,
      name: "مركز كفر الدوار",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 179,
      name: "كفر الزيات",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 180,
      name: "بندر كفر الشيخ",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 181,
      name: "مركز كفر الشيخ",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 182,
      name: "كفر سعد",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 183,
      name: "كفر صقر",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 184,
      name: "كوم امبو",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 185,
      name: "كوم حمادة",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 186,
      name: "محرم بك",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 187,
      name: "مطروح",
      mohafza_id: 25,
      mohafza: "مرسى مطروح"
    },
    {
      id: 188,
      name: "مصر الجديدة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 189,
      name: "مصر القديمة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 190,
      name: "مطاي",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 191,
      name: "مغاغه",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 192,
      name: "بندر ملوي",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 193,
      name: "مركز ملوي",
      mohafza_id: 17,
      mohafza: "المنيا"
    },
    {
      id: 194,
      name: "منفلوط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 195,
      name: "منوف",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 196,
      name: "منيا القمح",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 197,
      name: "مركز ميت غمر",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 198,
      name: "مينا البصل",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 199,
      name: "نجع حمادي",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 200,
      name: "نخل",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 201,
      name: "ههيا",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 202,
      name: "وادى النطرون",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 203,
      name: "قسم الاهرام",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 204,
      name: "قسم العامرية",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 205,
      name: "بندر امبابة",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 206,
      name: "بندر المطرية",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 207,
      name: "قسم الشرق",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 208,
      name: "قسم الغرب",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 209,
      name: "قسم المناخ",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 210,
      name: "قسم مينا بورسعيد",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 211,
      name: "قسم السويس",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 212,
      name: "قسم الاربعين",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 213,
      name: "مركز القصاصين",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 214,
      name: "قسم التل الكبير",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 215,
      name: "القناطر الخيرية",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 216,
      name: "مركز بركة السبع",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 217,
      name: "قسم مينا الاسكندرية",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 218,
      name: "بندر الاقصر",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 219,
      name: "قسم حدود اسوان",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 220,
      name: "جهينه الغربية",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 221,
      name: "قسم النزهة",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 222,
      name: "كفر شكر",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 223,
      name: "مركز فايد",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 224,
      name: "ابو رنيسه",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 225,
      name: "الحسنه",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 226,
      name: "سيد جابر",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 227,
      name: "الغنايم اسيوط",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 228,
      name: "قسم مينا السويس",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 229,
      name: "قسم شرطة العجوزة",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 230,
      name: "شرطه كفر الدوار",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 231,
      name: "شرطة بولاق الدكرور",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 232,
      name: "شرطة ميت غمر",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 233,
      name: "شرطة ساحل سليم",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 234,
      name: "ثاني المحلى الكبرى",
      mohafza_id: 10,
      mohafza: "الغربية"
    },
    {
      id: 235,
      name: "ثاني الزقازيق",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 236,
      name: "شرطة حدائق القبه",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 237,
      name: "شرطة مدينة نصر",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 238,
      name: "شرطة التبيين",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 239,
      name: "العمرانية",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 240,
      name: "شرطة الشربية",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 241,
      name: "شرطة الرحمانية",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 242,
      name: "شرطة مطويس",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 243,
      name: "القسيمه",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 244,
      name: "شرطة الحوامدية",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 245,
      name: "منشية النصر دقهلية",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 246,
      name: "شرطة كفر الحامول",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 247,
      name: "شرطة الزرقا دمياط",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 248,
      name: "شرطة مشتول السوق",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 249,
      name: "شرطة الابراهيميه",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 250,
      name: "جرشوط قنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 251,
      name: "ثاني شبرا الخيمة",
      mohafza_id: 8,
      mohafza: "القليوبية"
    },
    {
      id: 252,
      name: "شرطة اوسيم",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 253,
      name: "شرطة الفتح",
      mohafza_id: 18,
      mohafza: "اسيوط"
    },
    {
      id: 254,
      name: "شرطة راس البر",
      mohafza_id: 5,
      mohafza: "دمياط"
    },
    {
      id: 255,
      name: "ثان الاسماعيلية",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 256,
      name: "سرس الليان",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 257,
      name: "شرطة بور فؤاد",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 258,
      name: "شرطة ادكو",
      mohafza_id: 12,
      mohafza: "البحيرة"
    },
    {
      id: 259,
      name: "شرطة قنا",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 260,
      name: "شرطة الرياض",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 261,
      name: "شرطة الحنيات",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 262,
      name: "شرطة عين شمس",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 263,
      name: "قسم دسوق",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 264,
      name: "قسم رفح",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 265,
      name: "قسم نويبع",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 266,
      name: "قسم دهب",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 267,
      name: "شرم الشيخ",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 268,
      name: "سنتى كاترين",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 269,
      name: "الزاوية الحمراء",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 270,
      name: "السلام",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 271,
      name: "الزمالك",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 272,
      name: "منشية ناصر",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 273,
      name: "اولاد صقر",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 274,
      name: "شرطة فيصل",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 275,
      name: "الجناين",
      mohafza_id: 4,
      mohafza: "السويس"
    },
    {
      id: 276,
      name: "اول العريش",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 277,
      name: "ثالث العريش",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 278,
      name: "ثالث الاسماعيلية",
      mohafza_id: 13,
      mohafza: "الاسماعيلية"
    },
    {
      id: 279,
      name: "اطفيح",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 280,
      name: "الجمالية",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 281,
      name: "البساتين",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 282,
      name: "العاشر من رمضان",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 283,
      name: "الضواحى",
      mohafza_id: 3,
      mohafza: "بور سعيد"
    },
    {
      id: 284,
      name: "قسم القرين",
      mohafza_id: 7,
      mohafza: "الشرقية"
    },
    {
      id: 285,
      name: "قسم ثاني سوهاج",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 286,
      name: "رمانه",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 287,
      name: "الوقف",
      mohafza_id: 20,
      mohafza: "قنا"
    },
    {
      id: 288,
      name: "مركز السادات",
      mohafza_id: 11,
      mohafza: "المنوفية"
    },
    {
      id: 289,
      name: "15 مايو",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 290,
      name: "تمى الأمديد",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 291,
      name: "ميت ابو خالد",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 292,
      name: "ميت العامل",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 293,
      name: "المقاطعه",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 294,
      name: "اليرامون",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 295,
      name: "برداي",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 296,
      name: "نهوت",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 297,
      name: "صهرجت الكبرى",
      mohafza_id: 6,
      mohafza: "الدقهلية"
    },
    {
      id: 298,
      name: "ثان شبرا",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 299,
      name: "طره",
      mohafza_id: 1,
      mohafza: "القاهره"
    },
    {
      id: 300,
      name: "بندر جرجا",
      mohafza_id: 19,
      mohafza: "سوهاج"
    },
    {
      id: 301,
      name: "رابع العريش",
      mohafza_id: 26,
      mohafza: "سيناء الشمالية"
    },
    {
      id: 302,
      name: "غيط العنب",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 303,
      name: "جمرك النواتيه",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 304,
      name: "غبريال",
      mohafza_id: 2,
      mohafza: "الاسكندرية"
    },
    {
      id: 305,
      name: "ابورديس",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 306,
      name: "راس سدر",
      mohafza_id: 27,
      mohafza: "سيناء الجنوبية"
    },
    {
      id: 307,
      name: "شلاتين",
      mohafza_id: 21,
      mohafza: "اسوان"
    },
    {
      id: 308,
      name: "بلطيم",
      mohafza_id: 9,
      mohafza: "كفر الشيخ"
    },
    {
      id: 309,
      name: "الوراق",
      mohafza_id: 14,
      mohafza: "الجيزه"
    },
    {
      id: 310,
      name: "حلايب",
      mohafza_id: 21,
      mohafza: "اسوان"
    }
  ];
*/
  constructor(
    private api: ApiService,
    private markazCacheService: MarkazCacheService
  ) {
  }


  getAll() {

    let markaz$ = this.markazCacheService.getValue();

    if (!markaz$) {
      markaz$ = this.api.get('dataentry/markaz').pipe(
        map((response: ApiResponse) => response['Data'] as Markaz[]),
        shareReplay(1)
      );

      this.markazCacheService.setValue(markaz$);
    }

    return markaz$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`dataentry/markaz/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.markazCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    //let markaz$ = this.markaz$.find((data: any) => (data["id"]).toString() === id.toString())

    let markaz$ = this.markazCacheService.getByKey( "id", id );

    if (!markaz$) {
      markaz$ = this.api.get(`dataentry/markaz/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Markaz),
        shareReplay(1)
      );
    }

    return markaz$;
  }


  getByMohafza(mohafza_id: number) {
    let markaz$ = this.markazCacheService.getValue(mohafza_id.toString());

    if (!markaz$) {
      markaz$ = this.api.get(`dataentry/markaz/mohafza/${mohafza_id}`).pipe(
        map((response: ApiResponse) => response['Data'] as Markaz[]),
        shareReplay(1)
      );
    }
    return markaz$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`dataentry/markaz/${id}`, newValue)
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
      this.api.delete(`dataentry/markaz/${id}`)
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
