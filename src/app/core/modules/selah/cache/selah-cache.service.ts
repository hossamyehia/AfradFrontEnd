import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Selah from '../model/selah.model';

@Injectable({
  providedIn: 'root'
})
export class SelahCacheService extends AbstractCacheService<Selah[]>{

}
