import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { Patient } from 'src/app/Model/patient';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  idPatientSeleted: number;
  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService
  ) { }
  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => {
      this.patients = data;
    })
  }




}
