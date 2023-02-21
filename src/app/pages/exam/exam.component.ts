import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { ExamService } from 'src/app/service/exam.service';
import { Exam } from '../../Model/exam';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private examService: ExamService,
    private _SnackBar: MatSnackBar
    ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Exam>;
  displayedColumns: String[] = ['id','nameExam','descriptionExam','actions'];

  ngOnInit(): void {
    //con estas lines reaccionamos
    this.examService.getExamChange().subscribe(data =>{
      this.createTable(data);
    });

    this.examService.getMessageChange().subscribe(data =>{
        this._SnackBar.open(data,"INFO",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:2000});
    });

   this.examService.findAll().subscribe(data => {
    //console.log(data);
    this.createTable(data);

   });
  }
  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim();//trim elimina los espacios al inicio y final
  }
  createTable(data:Exam[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  delete(id: number){
    this.examService.delete(id).pipe(switchMap(() => {
      return this.examService.findAll()
    }))
    .subscribe(data => {
      //this.createTable(data);
      //internamente se esta hacinedo un .NEXT para gurdar la data en esa variable reactiva.
      this.examService.setExamChange(data);
      this.examService.setMessageChange("DELETED!");
    })
  }


}
