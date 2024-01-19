import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import JobTitle from '../model/jobTitle.model';

@Injectable({
  providedIn: 'root'
})
export class JobTitleCacheService extends AbstractCacheService<JobTitle[]>{

}
