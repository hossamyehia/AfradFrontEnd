import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  DaragaService,
  DobatSafService,
  EfficencyReportsService,
  MissionService,
  SanctionService,
  TransportationService,
  VacationService,
} from 'src/app/core';
import { PromotionService } from 'src/app/core/modules/promotion/service/promotion.service';
import { RenewalService } from 'src/app/core/modules/renewal/service/renewal.service';
import { PrintService } from 'src/app/core/service/utils/print/print.service';

@Component({
  selector: 'app-dabet-saf',
  templateUrl: './dabet-saf.component.html',
  styleUrls: [],
})
export class DabetSafComponent /* implements OnInit*/ {
  id!: number | string | null;
  data: any;
  parts: number = 0;

  /*    Ranks Part Data توايج الترقي      */
  rankData!: any;
  ranksData!: any;
  ranksFormType = true;
  ranksHeader: any = {
    daraga_name: 'درجة',
    promotion_date: 'تاريخ',
  };
  /*    Renewals Part Data التجديد        */
  renewalPeriod: any;
  renewalPeriods: any[] = [{}, {}];
  renewalFormType = true;
  /*    Reports Part Data تقرير التجديد   */
  reportData!: any;
  reportsData!: any;
  reportsFormType = true;
  reportsHeader: any = {
    year: 'العام',
    degree: 'التقدير',
  };
  /*    Sanctions Part Data العقوبات الأنضباطية    */
  sanctionData!: any;
  sanctionsData!: any;
  sanctionsFormType = true;
  sanctionsHeader: any = {
    type_name: 'نوع الجريمة',
    crime_date: 'تاريخ الجريمة',
    decision_name: 'العقوبة',
    evidance_date: 'تاريخ رفع الأثار',
    absence_from: 'متغيب من',
    absence_to: 'متغيب حتي',
    imprisoned_from: 'محبوس من',
    imprisoned_to: 'محبوس حتي',
    description: 'وصف الجريمة',
  };
  /*    Vacations Part Data الأجازات    */
  vacationData!: any;
  vacationsData!: any;
  vacationsFormType = true;
  vacationsHeader: any = {
    type: 'نوع الأجازة',
    days: 'عدد الأيام',
    months: 'عدد الأشهر',
    years: 'عدد السنوات',
    from: 'تاريخ بداية الأجازة',
    to: 'تاريخ نهاية الأجازة',
  };
  /*    Missions Part Data البعثات    */
  missionData!: any;
  missionsData!: any;
  missionsFormType = true;
  missionsHeader: any = {
    destination: 'الجهه',
    approval_number: 'رقم التصديق',
    approval_date: 'تاريخ التصديق',
    from: 'تاريخ بداية البعثة',
    to: 'تاريخ نهاية البعثة',
  };
  /*    transportations Part Data التنقلات    */
  transportationData!: any;
  transportationsData!: any[];
  transportationsFormType = true;
  transportationsHeader: any = {
    approval_number: 'رقم التصديق',
    approval_date: 'تاريخ التصديق',
    from_name: 'متجهه من',
    to_name: 'متجهه من',
    done_date: 'تاريخ التنفيذ',
    selah_name: 'السلاح',
  };
  /*************************************** */

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(
    private dobatSafAPI: DobatSafService,
    private promotionAPI: PromotionService,
    private renewalAPI: RenewalService,
    private efficiencyReportsAPI: EfficencyReportsService,
    private sanctionAPI: SanctionService,
    private vacationAPI: VacationService,
    private missionAPI: MissionService,
    private transportationAPI: TransportationService,

    private _print: PrintService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.loadData();
    });
  }

  loadData() {
    this.dobatSafAPI.getById(this.id as number).subscribe({
      next: (results: any) => {
        this.data = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });

    Promise.all([
      firstValueFrom(this.promotionAPI.getByDabet(this.id as number)),
      firstValueFrom(this.renewalAPI.getByDabet(this.id as number)),
      firstValueFrom(this.efficiencyReportsAPI.getByDabet(this.id as number)),
      firstValueFrom(this.sanctionAPI.getByDabet(this.id as number)),
      firstValueFrom(this.vacationAPI.getByDabet(this.id as number)),
      firstValueFrom(this.missionAPI.getByDabet(this.id as number)),
      firstValueFrom(this.transportationAPI.getByDabet(this.id as number)),
    ])
      .then((results: any) => {
        this.ranksData = results[0] as Array<any>;

        // Organize Renewal Data To display in correct order
        if (results[1].length == 1) {
          // Find which period is Added to display in right place
          if (results[1][0]['period'] == 0)
            this.renewalPeriods[0] = results[1][0]; // DEV 1
          else if (results[1][0]['period'] == 1)
            this.renewalPeriods[1] = results[1][0]; // DEV 2
        } else this.renewalPeriods = results[1];

        this.reportsData = results[2];
        this.sanctionsData = results[3];
        this.vacationsData = results[4];
        this.missionsData = results[5];
        this.transportationsData = results[6];
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }

  switchParts(part: number) {
    this.parts = part;
  }

  /**
   * Reset Form Data & Btns
   * @param part Which Form
   */
  resetFormType(part: number) {
    if (part == 0) this.ranksFormType = true; /***********************RANKS */
    else if (part == 1)
      this.renewalFormType = true; /********************RENEWALS */
    else if (part == 2)
      this.reportsFormType = true; /*********************REPORTS */
    else if (part == 3)
      this.sanctionsFormType = true; /*******************Sanctions */
    else if (part == 4)
      this.vacationsFormType = true; /*******************Vacations */
    else if (part == 5)
      this.missionsFormType = true; /********************Missions */
    else if (part == 6)
      this.transportationsFormType = true; /*************Transportations */
  }
  /*************************** */

  //  Convert Form TO Edit
  editFormType(part: number) {
    if (part == 0) this.ranksFormType = false; /***********************RANKS */
    else if (part == 1)
      this.renewalFormType = false; /********************RENEWALS */
    else if (part == 2)
      this.reportsFormType = false; /*********************REPORTS */
    else if (part == 3)
      this.sanctionsFormType = false; /*******************Sanctions */
    else if (part == 4)
      this.vacationsFormType = false; /*******************Vacations */
    else if (part == 5)
      this.missionsFormType = false; /********************Missions */
    else if (part == 6)
      this.transportationsFormType = false; /*************Transportations */
  }
  /************************** */

  runOperation(obj: any) {
    if (obj.operation === 'edit') {
      this.editFormType(this.parts); //  Convert Form TO Edit
      if (this.parts === 0) this.editRanks(obj.id);
      else if (this.parts === 1) this.editRenewal(obj.id);
      else if (this.parts === 2) this.editReport(obj.id);
      else if (this.parts === 3) this.editSanctions(obj.id);
      else if (this.parts === 4) this.editVacations(obj.id);
      else if (this.parts === 5) this.editMissions(obj.id);
      else if (this.parts === 6) this.editTransportations(obj.id);
    } else if (obj.operation === 'delete') {
      if (this.parts === 0) this.deleteRanks(obj.id);
      else if (this.parts === 1) this.deleteRenewal(obj.id);
      else if (this.parts === 2) this.deleteReport(obj.id);
      else if (this.parts === 3) this.deleteSanctions(obj.id);
      else if (this.parts === 4) this.deleteVacations(obj.id);
      else if (this.parts === 5) this.deleteMissions(obj.id);
      else if (this.parts === 6) this.deleteTransportations(obj.id);
    }
  }

  /**********************RANKS */
  editRanks(id: number) {
    this.promotionAPI.getById(id).subscribe({
      next: (results: any) => {
        this.rankData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteRanks(id: number) {
    this.promotionAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*******************RENEWALS */
  editRenewal(id: number) {
    this.renewalAPI.getById(id).subscribe({
      next: (results: any) => {
        this.renewalPeriod = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteRenewal(id: number) {
    this.renewalAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*********************REPORTS */
  editReport(id: number) {
    this.efficiencyReportsAPI.getById(id).subscribe({
      next: (results: any) => {
        this.reportData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteReport(id: number) {
    this.efficiencyReportsAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*******************Sanctions */
  editSanctions(id: number) {
    this.sanctionAPI.getById(id).subscribe({
      next: (results: any) => {
        this.sanctionData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteSanctions(id: number) {
    this.sanctionAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*******************Vacations */
  editVacations(id: number) {
    this.vacationAPI.getById(id).subscribe({
      next: (results: any) => {
        this.vacationData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteVacations(id: number) {
    this.vacationAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /********************Missions */
  editMissions(id: number) {
    this.missionAPI.getById(id).subscribe({
      next: (results: any) => {
        this.missionData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteMissions(id: number) {
    this.missionAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*************************** */
  editTransportations(id: number) {
    this.transportationAPI.getById(id).subscribe({
      next: (results: any) => {
        this.transportationData = results;
      },
      error: (err: any) => {
        this.msgStart(err.Message, false);
      },
    });
  }
  deleteTransportations(id: number) {
    this.transportationAPI
      .remove(id)
      .then((res: any) => {
        this.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgStart(err.Message, false);
      });
  }
  /*************************** */

  downloadAsPdf(contant: any){
    this._print.downloadAsPdf(contant, this.id as string);
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
