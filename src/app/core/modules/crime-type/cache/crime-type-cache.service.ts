import { Injectable } from '@angular/core';
import CrimeType from '../model/crimeType.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class CrimeTypeCacheService extends AbstractCacheService<CrimeType[]> {

}
