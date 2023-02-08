import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';

const routes: Routes = [
  {
    path:'pages/patient', component: PatientComponent,
    children:[
      { path:'new', component: PatientEditComponent },
      { path:'edit/:id', component: PatientEditComponent },
    ],
  },
  {
    path:'pages/medic', component: MedicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
