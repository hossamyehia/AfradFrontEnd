import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RenewalService } from 'src/app/core/modules/renewal/service/renewal.service';

@Component({
  selector: 'app-renewals',
  templateUrl: './renewals.component.html',
  styleUrls: []
})
export class RenewalsComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Input() period!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private fb: FormBuilder,
    private renewalAPI: RenewalService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes["data"].previousValue) {
        this.dataForm?.patchValue(
          (({ from, to, publish_date, ...rest }) => {
            return { from: from.split('T')[0], to: to.split('T')[0], publish_date: publish_date.split('T')[0], ...rest };
          })(this.data)
        );
        //this.dataForm?.patchValue(this.data);
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      publish_date: [null, Validators.required],
      recommendation: [null, Validators.required],
      period: [null, Validators.required],
      reason: [null]
    });
  }


  onSubmit() {
    if (!this.formType) {
      this.edit();
    }else{
      this.add();
    }
  }

  add() {
    let newValue = {
      ...this.dataForm.value,
      dabet_id: this.ID,
    };
    this.renewalAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit(){
    this.renewalAPI
      .edit(this.data.id, this.dataForm.value)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  reset(){
    if(!this.formType){
      this.cancel.emit();
      this.dataForm.reset();
    }
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
