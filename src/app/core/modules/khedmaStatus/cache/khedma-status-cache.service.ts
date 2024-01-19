import { Injectable } from '@angular/core';
import KhedmaStatus from '../model/index.model';
import { AbstractCacheService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class KhedmaStatusCacheService extends AbstractCacheService<KhedmaStatus[]> {

}
