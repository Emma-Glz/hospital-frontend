import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medic } from 'src/app/Model/medic';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {
  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>
  ){}

  ngOnInit(): void {
    /*this.medic = new Medic();
    this.medic.primaryName = this.data.primaryName;
    this.medic.surName = this.data.surName;
    this.medic.cmp = this.data.cmp;
    this.medic.photo = this.data.photo;*/

    this.medic = {...this.data};

  }
  sendData(){


  }
  close(){
    this._dialogRef.close();

  }
}
