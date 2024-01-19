import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Wehda from '../model/wehda.model';

@Injectable({
  providedIn: 'root'
})
export class WehdaCacheService extends AbstractCacheService<Wehda[]>{

}
