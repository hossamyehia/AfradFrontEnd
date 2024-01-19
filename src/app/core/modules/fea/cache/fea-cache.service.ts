import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Fea from '../model/fea.model';

@Injectable({
  providedIn: 'root'
})
export class FeaCacheService extends AbstractCacheService<Fea[]>{
}
