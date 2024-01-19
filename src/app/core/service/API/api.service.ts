import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ApiService {
  baseURL: string = "http://30.30.30.88:81/api/";

  constructor(private http: HttpClient) { }

  get(endpoint: string, params?: any ) {
    return this.http.get<any | any[]>(this.baseURL + endpoint, { params: params});
  }

  post(endpoint: string, data: any | any[] ){
    return this.http.post<any | any[]>(this.baseURL + endpoint, data);
  }

  put(endpoint: string, data?: any){
    return this.http.put<any>(this.baseURL + endpoint, data);
  }
  delete(endpoint: string){
    return this.http.delete<any>(this.baseURL + endpoint);
  }
}
