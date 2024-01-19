import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import CrimeSanction from '../model/crimeSanction.model';

@Injectable({
  providedIn: 'root'
})
export class CrimeSanctionCacheService extends AbstractCacheService<CrimeSanction[]> {

}
