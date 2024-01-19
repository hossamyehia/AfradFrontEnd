import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaragaService } from 'src/app/core';
import { PromotionService } from 'src/app/core/modules/promotion/service/promotion.service';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: [],
})
export class RanksComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  options: any[] = [];

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private fb: FormBuilder,
    private daragaAPI: DaragaService,
    private promotionAPI: PromotionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(
          (({ promotion_date, ...rest }) => {
            return { promotion_date: promotion_date.split('T')[0], ...rest };
          })(this.data)
        );
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      daraga_id: [null, Validators.required],
      promotion_date: [null, Validators.required],
    });

    this.daragaAPI.getAll().subscribe({
      next: (results: any) => {
        this.options = results;
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
    this.promotionAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.promotionAPI
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
