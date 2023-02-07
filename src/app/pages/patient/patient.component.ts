import { Component,OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../Model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Patient>;
  displayedColumns: String[] = ['id','firstName','lastName','dni','actions'];

  ngOnInit(): void {
   this.patientService.findAll().subscribe(data => {
    //console.log(data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


   });
  }
  applyFilter(event: any){
    console.log(event);
    this.dataSource.filter = event.target.value.trim();
  }


}
