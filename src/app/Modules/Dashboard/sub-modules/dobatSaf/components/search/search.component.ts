import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  DaragaService,
  FeaService,
  HelperService,
  MohafzaService,
  SelahService,
  WehdaService,
} from 'src/app/core';
import { KhedmaStatusService } from 'src/app/core/modules/khedmaStatus/service/khedma-status.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [],
})
export class SearchComponent {
  @Output() searchVals: EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup = new FormGroup({
    rkmaskry: new FormControl(null),
    name: new FormControl(null),
    daraga_id: new FormControl(null),
    fea_id: new FormControl(null),
    selah_id: new FormControl(null),
    wehda_id: new FormControl(null),
    khedma_id: new FormControl(null),
    mohafza_id: new FormControl(null),
  });

  mohafzat!: any[];
  feaat!: any[];
  daragat!: any[];
  asleha!: any[];
  wehdat!: any[];
  khedmaStatus!: any[];

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private helper: HelperService,

    private mohafzaAPI: MohafzaService,
    private feaAPI: FeaService,
    private daragaAPI: DaragaService,
    private selahAPI: SelahService,
    private wehdaAPI: WehdaService,
    private khedmaAPI: KhedmaStatusService
  ) {}

  ngOnInit(): void {this.loadData();}

  loadData() {
    Promise.all([
      firstValueFrom(this.mohafzaAPI.getAll()),
      firstValueFrom(this.khedmaAPI.getAll()),
      firstValueFrom(this.feaAPI.getAll()),
      firstValueFrom(this.daragaAPI.getAll()),
      firstValueFrom(this.selahAPI.getAll()),
      firstValueFrom(this.wehdaAPI.getAll()),
    ])
      .then((results) => {
        this.mohafzat = [ ...results[0] ] as Array<any>;
        this.khedmaStatus = [  ...results[1] ] as Array<any>;
        this.feaat = [ ...results[2] ] as Array<any>;
        this.daragat = [ ...results[3] ] as Array<any>;
        this.asleha = [ {"id": "", "name":"Default"}, ...results[4] ] as Array<any>;
        this.wehdat = [ {"id": "", "name":"Default"}, ...results[5] ] as Array<any>;
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  onSearch() {
    this.searchVals.emit(this.helper.clean(this.searchForm.value));
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
