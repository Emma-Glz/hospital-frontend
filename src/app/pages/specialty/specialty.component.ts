import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { Specialty } from '../../Model/specialty';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private specialtyService: SpecialtyService,
    private _SnackBar: MatSnackBar
    ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Specialty>;
  displayedColumns: String[] = ['id','NameSpecialty','DescriptionSpecialty','actions'];

  ngOnInit(): void {
    //con estas lines reaccionamos
    this.specialtyService.getSpecialtyChange().subscribe(data =>{
      this.createTable(data);
    });

    this.specialtyService.getMessageChange().subscribe(data =>{
        this._SnackBar.open(data,"INFO",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:2000});
    });

   this.specialtyService.findAll().subscribe(data => {
    //console.log(data);
    this.createTable(data);

   });
  }
  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim();//trim elimina los espacios al inicio y final
  }
  createTable(data:Specialty[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  delete(id: number){
    this.specialtyService.delete(id).pipe(switchMap(() => {
      return this.specialtyService.findAll()
    }))
    .subscribe(data => {
      //this.createTable(data);
      //internamente se esta hacinedo un .NEXT para gurdar la data en esa variable reactiva.
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange("DELETED!");
    })
  }

}
