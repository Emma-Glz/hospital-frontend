import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from '../../Model/patient';
import { PatientService } from '../../service/patient.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Medic } from 'src/app/Model/medic';
import { Specialty } from '../../Model/specialty';
import { Exam } from '../../Model/exam';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { ExamService } from '../../service/exam.service';
import { ConsultService } from '../../service/consult.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultDetail } from '../../Model/consultDetail';
import { Consult } from '../../Model/consult';

import * as moment from 'moment';
import { ConsultListExamDTO } from '../../dto/consultListExamDTO';
@Component({
  selector: 'app-consult-autocomple',
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css']
})
export class ConsultAutocompleComponent implements OnInit {

  PatientControl: FormControl = new FormControl();
  MedicControl: FormControl = new FormControl();
  form: FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];
  details: ConsultDetail[] = [];

  minDate: Date = new Date();
  dateSeleted: Date;
  examsSeleted: Exam[] = [];

  patientsFiltered$: Observable<Patient[]>;
  medicsFiltered$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ) {

  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'patient': this.PatientControl,//internamente afecta al formulario
      'medic': this.MedicControl,
      'specialty': new FormControl(),
      'exam': new FormControl(),
      'consultDate': new FormControl(),
      'diagnosis': new FormControl(),
      'treatment': new FormControl(),
    });

    this.loadInitialData();
    //filtrado
    this.patientsFiltered$ = this.PatientControl.valueChanges.pipe(
      map(val => this.filterPatients(val))
    );
    this.medicsFiltered$ = this.MedicControl.valueChanges.pipe(
      map(val => this.filterMedic(val))
    );

  }

  loadInitialData() {
    //llamada a servicios
    this.patientService.findAll().subscribe(data => this.patients = data)
    this.medicService.findAll().subscribe(data => this.medics = data)
    this.specialtyService.findAll().subscribe(data => this.specialties = data)
    //this.specialties$ = this.specialtyService.findAll();
    this.examService.findAll().subscribe(data => this.exams = data);


  }

  filterPatients(val: any){
    if (val?.idPatient > 0) {
      return this.patients.filter(el =>
        el.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || el.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || el.dni.includes(val)
      )
    } else {
      return this.patients.filter(el =>
        el.firstName.toLowerCase().includes(val?.toLowerCase()) || el.lastName.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
      );
    }
  }
  showPatient(val: any) {
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  filterMedic(val: any) {
    if (val?.idMedic > 0) {
      //OBJECTS
      return this.medics.filter(elemento =>
        elemento.primaryName.toLowerCase().includes(val.primaryName.toLowerCase()) || elemento.surName.toLowerCase().includes(val.surName.toLowerCase()) || elemento.cmp.includes(val))

    } else {
      //STRING
      return this.medics.filter(element =>
        //elemento.primaryName.toLowerCase().includes(val?.toLowerCase()) || elemento.surName.toLowerCase().includes(val.toLowerCase()) || elemento.cmp.includes(val)
        element.primaryName.toLowerCase().includes(val?.toLowerCase()) || element.surName.toLowerCase().includes(val?.toLowerCase()) || element.cmp.includes(val)
      )
    }
  }
  showMedic(val: any) {
    return val ? `${val.primaryName} ${val.surName}` : val;
  }

  onDateChanged(e: any) {
    console.log(e)
  }

  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.form.value['diagnosis'];
    det.treatment = this.form.value['treatment'];
    this.details.push(det);
  }

  removeDetail(i: number) {
    this.details.splice(i, 1);
  }
  addExams() {
    if (this.form.value['exam'] != null) { //exam = formControlName
      this.examsSeleted.push(this.form.value['exam']);

    } else {
      this._snackBar.open("Please select a exam", "INFO", { duration: 2000 })
    }

  }
  removeExam(i: number) {
    this.exams.splice(i, 1);
  }
  save() {
    const consult = new Consult();
    consult.patient = this.form.value['patient'];
    consult.medic = this.form.value['medic'];
    consult.specialty = this.form.value['specialty'];
    consult.numConsult = "C2";
    consult.consultDate = moment(this.form.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');
    consult.details = this.details;

    const dto = new ConsultListExamDTO();
    dto.consult = consult;
    dto.lstExam = this.examsSeleted;

    this.consultService.saveTransational(dto).subscribe(() => {
      this._snackBar.open("CREATED", "INFO", { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 4000)

    }
    )
  }
  cleanControls() {
    this.form.reset();
    this.PatientControl.reset();
    this.MedicControl.reset();
    this.details = [];
    this.examsSeleted = [];
  }


}
