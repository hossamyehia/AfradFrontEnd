import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Markaz from '../model/markaz.model';

@Injectable({
  providedIn: 'root'
})
export class MarkazCacheService extends AbstractCacheService<Markaz[]>{
}
