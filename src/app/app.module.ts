import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './pages/patient/patient.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { DialogConfirmationComponent } from './pages/medic/medic-dialog/dialog-confirmation/dialog-confirmation.component';
import { ExamComponent } from './pages/exam/exam.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { ConsultAutocompleComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MedicComponent,
    PatientEditComponent,
    MedicDialogComponent,
    DialogConfirmationComponent,
    ExamComponent,
    SpecialtyComponent,
    SpecialtyEditComponent,
    ExamEditComponent,
    ConsultComponent,
    ConsultAutocompleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,//permite el consumo de http de todo el proyecto
    MaterialModule,
    ReactiveFormsModule,//activar para el form de patient-edit
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
