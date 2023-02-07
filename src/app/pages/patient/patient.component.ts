import { Component,OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../Model/patient';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService){}

  dataSource: MatTableDataSource<Patient>;
  displayedColumns: String[] = ['id','firstName','lastName','dni','actions'];

  ngOnInit(): void {
   this.patientService.findAll().subscribe(data => {
    //console.log(data);
    this.dataSource = new MatTableDataSource(data);

   });
  }


}
