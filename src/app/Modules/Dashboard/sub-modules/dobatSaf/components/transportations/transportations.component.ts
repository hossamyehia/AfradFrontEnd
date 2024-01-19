import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelahService, TransportationService, WehdaService } from 'src/app/core';

@Component({
  selector: 'app-transportations',
  templateUrl: './transportations.component.html',
  styleUrls: [],
})
export class TransportationsComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  wehdat!: any[];
  asleha!: any[];

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private fb: FormBuilder,
    private wehdaAPI: WehdaService,
    private selahAPI: SelahService,
    private transportationAPI: TransportationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(
          (({ approval_date, done_date, ...rest }) => {
            return {
              approval_date: approval_date.split('T')[0],
              done_date: done_date.split('T')[0],
              ...rest,
            };
          })(this.data)
        );
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      approval_number: [null, Validators.required],
      approval_date: [null, Validators.required],
      from_id: [null, Validators.required],
      to_id: [null, Validators.required],
      done_date: [null, Validators.required],
      selah_id: [null, Validators.required],
    });
    this.wehdaAPI.getAll().subscribe({
      next: (results: any) => {
        this.wehdat = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
    this.selahAPI.getAll().subscribe({
      next: (results: any) => {
        this.asleha = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
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
    this.transportationAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.transportationAPI
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
