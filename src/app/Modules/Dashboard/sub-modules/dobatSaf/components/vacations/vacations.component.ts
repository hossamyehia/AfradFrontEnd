import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacationService } from 'src/app/core';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: [],
})
export class VacationsComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private fb: FormBuilder, private vacationAPI: VacationService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(
          (({
            from,
            to,
            ...rest
          }) => {
            return {
              from: from.split('T')[0],
              to: to.split('T')[0],
              ...rest,
            };
          })(this.data));
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      type: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      days: [0, Validators.required],
      months: [0, Validators.required],
      years: [0, Validators.required],
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
    this.vacationAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.vacationAPI
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
