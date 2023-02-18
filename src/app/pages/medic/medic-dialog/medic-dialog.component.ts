import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medic } from 'src/app/Model/medic';
import { MedicService } from '../../../service/medic.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {
  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
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
    if(this.medic != null && this.medic.idMedic > 0){
      //UPDATE
      this.medicService.update(this.medic,this.medic.idMedic)
      .pipe(
        switchMap(()=> this.medicService.findAll()
      ))
      .subscribe(data =>{
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange("UPDATED!");
      })
    }else{
      //CREATE
      this.medicService.save(this.medic)
      .pipe(
        switchMap(()=> this.medicService.findAll()
        ))
        .subscribe(data =>{
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange("CREATED!");
      })
    }
    this._dialogRef.close();

  }
  close(){
    this._dialogRef.close();

  }
}
