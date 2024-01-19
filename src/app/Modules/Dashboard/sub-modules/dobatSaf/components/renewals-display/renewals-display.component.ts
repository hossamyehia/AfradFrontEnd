import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-renewals-display',
  templateUrl: './renewals-display.component.html',
  styleUrls: []
})
export class RenewalsDisplayComponent {
  @Input() period: any = '';
  @Input() data!: any;
  @Output() runOperation: EventEmitter<any> = new EventEmitter();


  constructor() {}

  isEmpty(data: any){
    return data.constructor === Object && Object.keys(data).length === 0;
  }

  runOp(id: number | string, operation: string, route?: string) {
    this.runOperation.emit({
      id,
      operation,
      route: "renewal",
    });
  }


}
