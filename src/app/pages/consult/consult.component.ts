import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { Patient } from 'src/app/Model/patient';
import { Observable } from 'rxjs';
import { ExamService } from '../../service/exam.service';
import { Medic } from 'src/app/Model/medic';
import { Specialty } from '../../Model/specialty';
import { Exam } from 'src/app/Model/exam';
import { ConsultDetail } from 'src/app/Model/consultDetail';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Consult } from 'src/app/Model/consult';
import * as moment from 'moment';
import { ConsultListExamDTOI } from '../../dto/consultListExamDTOI';
import { ConsultService } from '../../service/consult.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  idPatientSeleted: number;
  idMedicSeleted: number;
  idSpecialtySeleted: number;
  idExamSeleted: number;
  dateSeleted: Date;

  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;

  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  minDate: Date = new Date();

  diagnosis: string;
  treatment: string;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.patients$ = this.patientService.findAll();
    this.medics$ = this.medicService.findAll();
    this.specialties$ = this.specialtyService.findAll();
    this.exams$ = this.examService.findAll();
  }
  OnDateChange(e: any) {
    console.log(e)
  }
  onDateInput(e: any) {
    console.log(e)
  }

  addDetail() {
    let det = new ConsultDetail();
    det.diagnosis = this.diagnosis;
    det.treatment = this.treatment;
    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }
  addExams() {
    if (this.idExamSeleted > 0) {
      this.examService.findById(this.idExamSeleted).subscribe(data => this.examsSelected.push(data))

    } else {
      this._snackBar.open("Please select an exam", 'INFO', { duration: 2000 });
    }
  }
  save() {
    const p = new Patient();
    p.idPatient = this.idPatientSeleted;
    const m = new Medic();
    m.idMedic = this.idMedicSeleted;
    const s = new Specialty();
    s.idSpecialty = this.idSpecialtySeleted;

    const consult = new Consult();
    consult.patient = p;
    consult.medic = m;
    consult.specialty = s;
    consult.numConsult = "C1";
    consult.details= this.details;

    console.log(consult);

    /*let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTIme = (new Date(this.dateSeleted.getTime()-tzoffset)).toISOString();*/

    consult.consultDate = moment(this.dateSeleted).format('YYYY-MM-DDTHH:mm:ss');


    const dto: ConsultListExamDTOI = {
      consult: consult,
      lstExam: this.examsSelected
    }

    this.consultService.saveTransational(dto).subscribe(() => {
      this._snackBar.open("CREATED!", "INFO", { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000)

    });


  }
  cleanControls() {
    this.idPatientSeleted = 0;
    this.idExamSeleted = 0;
    this.idMedicSeleted = 0;
    this.idSpecialtySeleted = 0;
    this.diagnosis = null;
    this.treatment = null;
    this.dateSeleted = new Date();
    this.details = [];
    this.examsSelected = [];

  }
}
