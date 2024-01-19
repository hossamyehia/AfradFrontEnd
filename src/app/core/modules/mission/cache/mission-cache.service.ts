import { Injectable } from '@angular/core';
import Mission from '../model/missions.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class MissionCacheService extends AbstractCacheService<Mission[]>{

}
