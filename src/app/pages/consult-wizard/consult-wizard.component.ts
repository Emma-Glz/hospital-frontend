import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../Model/patient';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Medic } from 'src/app/Model/medic';
import { Specialty } from '../../Model/specialty';
import { Exam } from 'src/app/Model/exam';
import { ConsultDetail } from '../../Model/consultDetail';
import { PatientService } from '../../service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { ExamService } from 'src/app/service/exam.service';
import { ConsultService } from 'src/app/service/consult.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicService } from 'src/app/service/medic.service';
import { Consult } from 'src/app/Model/consult';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css']
})
export class ConsultWizardComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  minDate: Date = new Date();

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];
  specialtiesSelected: Specialty[] = [];

  consults: number[] = [];
  consultSelected: number;

  medicSelected: Medic;

  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      'patient': [new FormControl(), Validators.required],
      'specialty': [new FormControl(), Validators.required],
      'exam': [new FormControl(''), Validators.required],
      'consultDate': [new FormControl(new Date()), Validators.required],
      'diagnosis': new FormControl('', [Validators.required]),
      'treatment': new FormControl('', [Validators.required])
    });

    this.secondFormGroup = this._formBuilder.group({

    });
    this.loadInitialData();

  }
  loadInitialData() {
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
    this.examService.findAll().subscribe(data => this.exams = data);

    for (let consult = 1; consult <= 100; consult++) {
      this.consults.push(consult);

    }
  }

  addDetails() {
    let det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.firstFormGroup.value['exam'] != null) {
      this.examsSelected.push(this.firstFormGroup.value['exam']);
    } else {
      this._snackBar.open('Please select an exam', 'INFO', { duration: 2000 });
    }
  }
  selectMedic(medic: Medic) {
    this.medicSelected = medic;
  }
  selectConsult(consult: number) {
    this.consultSelected = consult;
  }

  nextManualStep() {
    if (this.consultSelected > 0) {
      this.stepper.next();
    } else {
      this._snackBar.open('Please select a consult', 'INFO', { duration: 2000 });
    }
  }

  get f() {
    console.log(this.firstFormGroup.controls);
    return this.firstFormGroup.controls;
  }

}
