import { Component } from '@angular/core';
import { FeaService } from 'src/app/core';


@Component({
  selector: 'app-fea-page',
  templateUrl: './fea-page.component.html',
  styleUrls: []
})
export class FeaPageComponent {
  headers: any = {
    id: '#',
    name: 'الأسم',
    class_name: 'النوع'
  };

  data: Array<any> = [];
  displayData: Array<any> = [];
  feaData!: any;

  formType = true;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private feaAPI: FeaService) {
    this.loadData();
  }

  loadData() {
    this.feaAPI.getAll().subscribe({
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
    if (opObj.operation == 'edit'){
      this.formType = false;
      this.edit(opObj.id);
    } 
    if (opObj.operation == 'delete') this.delete(opObj.id);
  }

  edit(id: number) {
    this.feaAPI.getById(id).subscribe({
      next: (results: any) => {
        this.feaData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }

  delete(id: number) {
    this.feaAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  resetFormType(){
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
