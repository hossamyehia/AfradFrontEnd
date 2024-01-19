import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  MohafzaService,
  DobatSafService,
  MarkazService,
  FeaService,
  DaragaService,
  QualificationService,
  SelahService,
  WehdaService,
  JobTitleService,
} from 'src/app/core';
import { KhedmaStatusService } from 'src/app/core/modules/khedmaStatus/service/khedma-status.service';

@Component({
  selector: 'app-new-dabet-saf',
  templateUrl: './new-dabet-saf.component.html',
  styleUrls: [],
})
export class NewDabetSafComponent implements OnInit {
  id!: number | undefined;
  loading: boolean = true;
  parts: number = 0;

  dabetSaf: any = {
    rkmaskry: null,
    name: null,
    birth_date: null,
    religion: null,
    blood: null,
    marital_state: null,
    mohafza_id: null,
    markaz_id: null,
    address: null,
    nearest: null,
    address2: null,
    fea_id: null,
    khedma_id: null,
    daraga_id: null,
    taraky_date: null,
    tatwa_date: null,
    moahel_tatwa_id: null,
    highest_moahel_id: null,
    rateb3aly_date: null,
    selah_id: null,
    selah_khedma_id: null,
    wehda_id: null,
    join_date: null,
    takhasos_id: null,
    job_title_id: null,
    job_title_edafy_id: null,
    marriage_date: null,
    number_of_sons: null,
  };

  data!: any;

  form!: FormGroup;

  mohafzat!: any[];
  marakz!: any[];
  feaat!: any[];
  daragat!: any[];
  qualifications!: any[];
  asleha!: any[];
  wehdat!: any[];
  jobs!: any[];
  khedmaStatus!: any[];

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private dobatSafAPI: DobatSafService,
    private fb: FormBuilder,
    private route: ActivatedRoute,

    private mohafzaAPI: MohafzaService,
    private markazAPI: MarkazService,
    private feaAPI: FeaService,
    private daragaAPI: DaragaService,
    private qualificationAPI: QualificationService,
    private selahAPI: SelahService,
    private wehdaAPI: WehdaService,
    private jobTitleAPI: JobTitleService,
    private khedmaAPI: KhedmaStatusService
  ) {
    this.id = this.route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rkmaskry: ['', [Validators.pattern(/^\d+$/), Validators.required]],
      name: ['', Validators.required],
      birth_date: [null, Validators.required],
      religion: ['', Validators.required],
      blood: ['', Validators.required],
      marital_state: ['', Validators.required],
      marriage_date: [null],
      number_of_sons: [null],
      mohafza_id: [null, Validators.required],
      markaz_id: [null, Validators.required],
      address: ['', Validators.required],
      nearest: ['', Validators.required],
      address2: ['', Validators.required],
      fea_id: [null, Validators.required],
      khedma_id: [null, Validators.required],
      daraga_id: [null, Validators.required],
      taraky_date: [null, Validators.required],
      tatwa_date: [null, Validators.required],
      moahel_tatwa_id: [null, Validators.required],
      highest_moahel_id: [null, Validators.required],
      rateb3aly_date: [null, Validators.required],
      selah_id: [null, Validators.required],
      selah_khedma_id: [null, Validators.required],
      wehda_id: [null, Validators.required],
      join_date: [null, Validators.required],
      takhasos_id: [null, Validators.required],
      job_title_id: [null, Validators.required],
      job_title_edafy_id: [null, Validators.required],
    });
    this.loadData();
  }

  loadData() {
    /*
    this.mohafzat = this.mohafzaAPI.getAll();
    this.marakz = this.markazAPI.getAll();
    this.khedmaStatus = this.khedmaAPI.getAll();
    this.qualifications = this.qualificationAPI.getAll();
    */

    Promise.all([
      firstValueFrom(this.mohafzaAPI.getAll()),
      firstValueFrom(this.markazAPI.getAll()),
      firstValueFrom(this.khedmaAPI.getAll()),
      firstValueFrom(this.qualificationAPI.getAll()),
    ])
      .then((results) => {

        this.mohafzat = results[0] as Array<any>;
        this.marakz = results[1] as Array<any>;
        this.khedmaStatus = results[2] as Array<any>;
        this.qualifications = results[3] as Array<any>;

        Promise.all([
          firstValueFrom(this.feaAPI.getAll()),
          firstValueFrom(this.daragaAPI.getAll()),
          firstValueFrom(this.selahAPI.getAll()),
          firstValueFrom(this.wehdaAPI.getAll()),
          firstValueFrom(this.jobTitleAPI.getAll()),
        ])
          .then((results) => {
            this.feaat = results[0] as Array<any>;
            this.daragat = results[1] as Array<any>;
            this.asleha = results[2] as Array<any>;
            this.wehdat = results[3] as Array<any>;
            this.jobs = results[4] as Array<any>;
            this.loading = false;
            if (this.route.snapshot.queryParams['id']) this.getData();
            else this.reset();
          })
          .catch((err) => {
            this.msgStart(err.Message, false);
          });

      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });


  }

  getData() {
    firstValueFrom(
      this.dobatSafAPI.getById(this.route.snapshot.queryParams['id'])
    )
      .then((results: any) => {
        this.data = results;
        this.form.patchValue(this.data);
      })
      .catch((err: any) => {
        this.msgStart(err.Message, false);
      });
  }

  selectMohafza(elem: any) {
    this.markazAPI.getByMohafza(parseInt(elem.value)).subscribe({
      next: (result) => {
        this.marakz = result as Array<any>;
      },
      error: (err) => {
        this.msgStart(err.Message, false);
      },
    });
  }

  switchParts(part: number){
    this.parts = part;
  }

  onSubmit() {
    if (!this.id) this.add();
    else this.edit();
  }

  add() {
    this.dobatSafAPI
      .addDabetSaf(this.form.value)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  edit() {
    this.dobatSafAPI
      .editDabetSaf(this.id, this.form.value)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  reset() {
    this.id = undefined;
    this.form.patchValue(this.dabetSaf);
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
