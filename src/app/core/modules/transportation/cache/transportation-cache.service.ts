import { Injectable } from '@angular/core';
import Transportation from '../model/transportation.model';
import { AbstractCacheService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class TransportationCacheService extends AbstractCacheService<Transportation[]>{

}
