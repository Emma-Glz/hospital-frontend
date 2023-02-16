import { Component,OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../Model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private patientService: PatientService,
    private _SnackBar: MatSnackBar
    ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Patient>;
  displayedColumns: String[] = ['id','firstName','lastName','dni','actions'];

  ngOnInit(): void {
    //con estas lines reaccionamos
    this.patientService.getPatientChange().subscribe(data =>{
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data =>{
        this._SnackBar.open(data,"INFO",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:2000});
    });

   this.patientService.findAll().subscribe(data => {
    //console.log(data);
    this.createTable(data);

   });
  }
  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim();//trim elimina los espacios al inicio y final
  }
  createTable(data:Patient[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  delete(id: number){
    this.patientService.delete(id).pipe(switchMap(() => {
      return this.patientService.findAll()
    }))
    .subscribe(data => {
      //this.createTable(data);
      //internamente se esta hacinedo un .NEXT para gurdar la data en esa variable reactiva.
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange("DELETED!");
    })
  }

}
