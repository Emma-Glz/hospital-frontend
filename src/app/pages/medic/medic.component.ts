import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medic } from 'src/app/Model/medic';
import { MedicService } from '../../service/medic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  dataSource: MatTableDataSource<Medic>;
  displayedColumns: String[] = ['id', 'firstName', 'lastName', 'cmp', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicService: MedicService,
    private _SnackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.medicService.getMedicChange().subscribe(data => {
      this.createTable(data);
    });
    this.medicService.getMessageChange().subscribe(data => {
      this._SnackBar.open(data, "INFO", { duration: 2000 });
    })

    this.medicService.findAll().subscribe(data => {
      this.createTable(data);
    });

  }

  createTable(patient: any) {
    this.dataSource = new MatTableDataSource(patient);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim();

  }


  openDialog(medic?: Medic) {//?:sirve para indicar que este metodo puede enviarse con o sin parametros
    this._dialog.open(MedicDialogComponent,{
      width: '280px',
      data: medic,
      disableClose: true

    })
  }


  delete(id: number) {
    this.medicService.delete(id).pipe(switchMap(() => {
      return this.medicService.findAll();
    }))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange("DELETED!");
      })
  }



}
