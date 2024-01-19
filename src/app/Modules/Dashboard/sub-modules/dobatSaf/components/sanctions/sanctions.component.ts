import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  CrimeSanctionService,
  CrimeTypeService,
  SanctionService,
} from 'src/app/core';

@Component({
  selector: 'app-sanctions',
  templateUrl: './sanctions.component.html',
  styleUrls: [],
})
export class SanctionsComponent {
  @Input() ID!: number | string | null;
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  options1: any[] = [];
  options2: any[] = [];

  dataForm!: FormGroup;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private fb: FormBuilder,
    private crimeTypeAPI: CrimeTypeService,
    private crimeSanctionAPI: CrimeSanctionService,
    private sanctionAPI: SanctionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(
          (({
            crime_date,
            absence_from,
            absence_to,
            imprisoned_from,
            imprisoned_to,
            evidance_date,
            ...rest
          }) => {
            return {
              crime_date: crime_date.split('T')[0],
              absence_from: absence_from ? absence_from.split('T')[0] : absence_from,
              absence_to: absence_to ? absence_to.split('T')[0] : absence_to,
              imprisoned_from: imprisoned_from ? imprisoned_from.split('T')[0] : imprisoned_from,
              imprisoned_to: imprisoned_to ? imprisoned_to.split('T')[0] : imprisoned_to,
              evidance_date: evidance_date ? evidance_date.split('T')[0] : evidance_date,
              ...rest,
            };
          })(this.data)
        );
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      type_id: [null, Validators.required],
      decision_id: [null, Validators.required],
      crime_date: [null, Validators.required],
      absence_from: [null],
      absence_to: [null],
      imprisoned_from: [null],
      imprisoned_to: [null],
      evidance_date: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.loadData();
  }

  loadData() {
    Promise.all([
      firstValueFrom(this.crimeTypeAPI.getAll()),
      firstValueFrom(this.crimeSanctionAPI.getAll()),
    ])
      .then((results: any) => {
        this.options1 = results[0] as Array<any>;
        this.options2 = results[1] as Array<any>;
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
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
    this.sanctionAPI
      .add(newValue)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.sanctionAPI
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
