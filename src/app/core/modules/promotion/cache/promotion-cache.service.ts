import { Injectable } from '@angular/core';
import Promotion from '../model/promotion.model';
import { AbstractCacheService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionCacheService extends AbstractCacheService<Promotion[]>{

}
