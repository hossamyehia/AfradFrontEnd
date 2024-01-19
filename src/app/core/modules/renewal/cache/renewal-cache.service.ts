import { Injectable } from '@angular/core';
import Renewal from '../model/renewals.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class RenewalCacheService extends AbstractCacheService<Renewal[]>{

}
