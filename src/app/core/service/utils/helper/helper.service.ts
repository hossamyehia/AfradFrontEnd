import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  groupBy(xs: any[], key: string | number) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getLength(obj: object) {
    return Object.keys(obj).length;
  }

  clean(obj: any) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] == '' ||
        obj[propName] == 'default'
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }
}
