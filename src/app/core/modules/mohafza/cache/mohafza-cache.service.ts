import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core';
import Mohafza from '../model/mohafza.model';

@Injectable({
  providedIn: 'root'
})
export class MohafzaCacheService extends AbstractCacheService<Mohafza[]>{

}
