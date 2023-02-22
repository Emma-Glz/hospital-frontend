import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { Patient } from 'src/app/Model/patient';
import { Observable } from 'rxjs';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  idPatientSeleted: number;
  patients$: Observable<Patient[]>;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examSpecialty: ExamService
  ) { }
  ngOnInit(): void {
    this.patients$ = this.patientService.findAll();
  }




}
