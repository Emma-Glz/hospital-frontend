import { Component,OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../Model/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService){}

  patients: Patient[] = [];

  ngOnInit(): void {
   this.patientService.findAll().subscribe(data => {
    //console.log(data);
    this.patients = data;
   });
  }


}
