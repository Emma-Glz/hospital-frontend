import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css']
})
export class ConsultWizardComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];
  details: ConsultDetail[];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _skackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
        'patient': [new FormControl(),Validators.required],
        'specialty': [new FormControl(),Validators.required],
        'exam': [new FormControl(),Validators.required],
        'consultDate': [new FormControl(new Date()),Validators.required],
        'diagnosis': [new FormControl(),Validators.required],
        'treatment': [new FormControl(),Validators.required]
    });

    this.loadInitialData();

  }
  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
    this.examService.findAll().subscribe(data => this.exams = data);
  }
}
