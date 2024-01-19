import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core';
import DobatSaf from '../model/dobatSaf.model';

@Injectable({
  providedIn: 'root'
})
export class DobatSafCacheService extends AbstractCacheService<DobatSaf[]> {

}
