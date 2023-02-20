import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Medic } from 'src/app/Model/medic';
import { MedicService } from '../../../service/medic.service';
import { switchMap } from 'rxjs';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {
  medic: Medic;
  result: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService,
    private _dialogConfirmation: MatDialog
  ){}

  ngOnInit(): void {
    /*this.medic = new Medic();
    this.medic.primaryName = this.data.primaryName;
    this.medic.surName = this.data.surName;
    this.medic.cmp = this.data.cmp;
    this.medic.photo = this.data.photo;*/

    this.medic = {...this.data};//destructuracion de objetos

  }
  sendData(){
    const dialogRef = this._dialogConfirmation.open(DialogConfirmationComponent,{
      disableClose: true,
      data: this.medic
    })
    dialogRef.afterClosed().subscribe(result =>{
      //console.log(result);
      if(result){
        //update table
        this.medicService.update(this.medic,this.medic.idMedic).pipe(switchMap(() =>{
          return this.medicService.findAll();
        }))
        .subscribe(data =>{
          this.medicService.setMedicChange(data);
          //close dialog1
          this._dialogRef.close();
          this.medicService.setMessageChange("UPDATED!");
        })

      }
    })

  }
  close(){
    this._dialogRef.close();

  }
}
