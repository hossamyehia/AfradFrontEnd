import { Injectable } from '@angular/core';
import Sanction from '../model/sanctions.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class SanctionCacheService extends AbstractCacheService<Sanction[]>{

}
