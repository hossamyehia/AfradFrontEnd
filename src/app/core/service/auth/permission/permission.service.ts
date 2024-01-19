import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  permission!:string;
  routes: any = {
    user: 0,
    role: 1,
    dataEntry: 2,
    dobatSaf: 3,
    dabetinfo: 4
  }

  constructor(private auth: AuthService ) {
    this.permission = this.auth.getPermission();
  }

  canRead(route: string){
    if(!this.routes[route] && route != "user") return false;
    return (parseInt(this.permission[this.routes[route]], 32) & 1) == 1;
  }

  canWrite(route: string){
    if(!this.routes[route] && route != "user") return false;
    return (parseInt(this.permission[this.routes[route]], 32) & 2) == 2;
  }

  canEdit(route: string){
    if(!this.routes[route] && route != "user") return false;
    return (parseInt(this.permission[this.routes[route]], 32) & 4) == 4;
  }

  canDelete(route: string){
    if(!this.routes[route] && route != "user") return false;
    return (parseInt(this.permission[this.routes[route]], 32) & 8) == 8;
  }
}
