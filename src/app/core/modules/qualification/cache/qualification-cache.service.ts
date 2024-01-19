import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Qualification from '../model/qualification.model';

@Injectable({
  providedIn: 'root'
})
export class QualificationCacheService extends AbstractCacheService<Qualification[]>{

}
