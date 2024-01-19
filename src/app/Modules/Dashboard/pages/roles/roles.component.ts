import { Component } from '@angular/core';
import { RoleService } from 'src/app/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: []
})
export class RolesComponent {

  headers: any = {
    tag: 'كود النوع',
    title: 'الأسم',
    permission: 'الصلاحيات'
  };

  data: Array<any> = [];
  displayData: Array<any> = [];

  forEdit!: any;
  formType: boolean = true;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private roleAPI: RoleService) {
    this.loadData();
  }

  loadData() {
    this.roleAPI.getAll().subscribe({
      next: (results) => {
        this.data = results as Array<any>;
        this.displayData = this.data;
        this.displayData = this.displayData.slice();
      },
      error: (err) => {
        this.msgStart(err.Message, false);
      },
    });
  }

  runOperation(opObj: any) {
    if (opObj.operation == 'delete') this.delete(opObj.id);
    else if (opObj.operation == "edit"){
      this.formType = false;
      this.edit(opObj.id);
    }
  }

  edit(id: string){
    this.roleAPI.getByTag(id).subscribe({
      next: (results: any) => {
        this.forEdit = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }

  delete(id: string) {
    this.roleAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  reset(){
    this.formType = true;
  }

  msgStart(msg: string, type: boolean) {
    this.msgType = type;
    this.msgShow = true;
    this.msgContent = msg;
  }

  msgDone() {
    this.msgType = undefined;
    this.msgShow = false;
    this.msgContent = undefined;
  }

}
