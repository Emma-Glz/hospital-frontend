import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent {

  constructor(
    public _dialogRef: MatDialogRef<DialogConfirmationComponent>
  ){ }

  public confirmMessage:string = "Are you sure you want to send the data?";

}
