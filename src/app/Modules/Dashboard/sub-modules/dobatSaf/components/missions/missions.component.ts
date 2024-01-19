import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MissionService } from 'src/app/core';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: [],
})
export class MissionsComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private fb: FormBuilder, private missionAPI: MissionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(
          (({ approval_date, from, to, ...rest }) => {
            return {
              approval_date: approval_date.split('T')[0],
              from: from.split('T')[0],
              to: to.split('T')[0],
              ...rest,
            };
          })(this.data)
        );
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      destination: [null, Validators.required],
      approval_date: [null, Validators.required],
      approval_number: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.formType) {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let newValue = {
      ...this.dataForm.value,
      dabet_id: this.ID,
    };
    this.missionAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.missionAPI
      .edit(this.data.id, this.dataForm.value)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  reset() {
    if (!this.formType) {
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
