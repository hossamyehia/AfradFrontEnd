import { Injectable } from '@angular/core';
import FeaClass from '../model/fealClass.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class FeaClassCacheService extends AbstractCacheService<FeaClass[]>{

}
