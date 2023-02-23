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

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  idPatientSeleted: number;
  idMedicSeleted: number;
  idSpecialtySeleted: number;


  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;

  minDate: Date = new Date();
  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examSpecialty: ExamService
  ) { }
  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.patients$ = this.patientService.findAll();
    this.medics$ = this.medicService.findAll();
    this.specialties$ = this.specialtyService.findAll();
    this.exams$ = this.examSpecialty.findAll();
  }
  OnDateChange(e: any) {
    console.log(e)
  }
  onDateInput(e: any) {
    console.log(e)
  }



}
