import { Component } from '@angular/core';
import { DobatSafService } from 'src/app/core/modules/dobat-saf/service/dobat-saf.service';

@Component({
  selector: 'app-show-dabet-saf',
  templateUrl: './show-dabet-saf.component.html',
  styleUrls: [],
})
export class ShowDabetSafComponent {
  headers: any = {
    id: '#',
    rkmaskry: 'الرقم العسكري',
    name: 'الأسم',
    daraga: 'الدرجة',
    fea: 'الفئة',
    selah: 'السلاح الأساسي',
    wehda: 'الوحدة',
    khedma_status: 'الخدمة',
    mohafza: 'المحافظة',
  };

  data: Array<any> = [];
  displayData: Array<any> = [];

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private dobatSafAPI: DobatSafService) {
    this.loadData();
  }

  loadData() {
    this.dobatSafAPI.getAll().subscribe({
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
  }

  delete(id: number) {
    this.dobatSafAPI
      .removeDabetSaf(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  searchItems(values: any) {
    this.displayData = this.data.filter((el) => {
      return Object.entries(values).every(([key, value]) =>
        this.searchMatch(el[key], value)
      );
    });
  }

  searchMatch(target: any, search: any) {
    if (typeof target == 'number') return Number(target) == Number(search);
    search = String(search).trim().toLowerCase();
    return String(target).toLowerCase().includes(search);
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
