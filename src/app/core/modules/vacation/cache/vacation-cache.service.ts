import { Injectable } from '@angular/core';
import Vacation from '../model/vacations.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class VacationCacheService extends AbstractCacheService<Vacation[]>{

}
