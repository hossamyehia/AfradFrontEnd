import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Daraga from '../model/daraga.model';

@Injectable({
  providedIn: 'root'
})
export class DaragaCacheService extends AbstractCacheService<Daraga[]> {

}
