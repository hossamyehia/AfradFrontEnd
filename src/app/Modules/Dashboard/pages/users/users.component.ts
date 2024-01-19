import { Component } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent {

  headers: any = {
    id: '#',
    rank: 'رتبة/درجة',
    name: 'الأسم',
    username: 'أسم المستخدم',
    password: 'كلمة السر',
    role: 'نوع الحساب'
  };

  data: Array<any> = [];
  displayData: Array<any> = [];

  forEdit!: any;
  formType: boolean = true;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private userAPI: UserService) {
    this.loadData();
  }

  loadData() {
    this.userAPI.getAll().subscribe({
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

  edit(id: number){
    this.userAPI.getById(id).subscribe({
      next: (results: any) => {
        this.forEdit = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }

  delete(id: number) {
    this.userAPI
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
