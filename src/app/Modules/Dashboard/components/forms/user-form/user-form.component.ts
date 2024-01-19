import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService, UserService } from 'src/app/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: []
})
export class UserFormComponent {

  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  options!: any;

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private fb: FormBuilder, private userAPI: UserService,private roleAPI: RoleService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(this.data);
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      rank: [null, Validators.required],
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
    });

    this.loadData();
  }

  loadData(){
    this.roleAPI.getAll().subscribe({
      next: (results) => {
        this.options = results as Array<any>;
      },
      error: (err) => {
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
    this.userAPI
      .add(this.dataForm.value)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.userAPI
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
