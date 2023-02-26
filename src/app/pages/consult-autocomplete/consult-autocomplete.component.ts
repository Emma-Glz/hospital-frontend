import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from '../../Model/patient';
import { PatientService } from '../../service/patient.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Medic } from 'src/app/Model/medic';
import { Specialty } from '../../Model/specialty';
import { Exam } from '../../Model/exam';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { ExamService } from '../../service/exam.service';
import { ConsultService } from '../../service/consult.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consult-autocomple',
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css']
})
export class ConsultAutocompleComponent implements OnInit {

  PatientControl: FormControl = new FormControl();
  form: FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];



  patientsFiltered$: Observable<Patient[]>;

  constructor(
    private patientService: PatientService,
    private MedicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ) {

  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'patient': this.PatientControl,//internamente afecta al formulario
      'medic': new FormControl(),
      'specialty': new FormControl(),
      'exam': new FormControl(),
      'consultDate': new FormControl(),
      'diagnosis': new FormControl(),
      'treatment': new FormControl(),
    });

    this.loadInitialData();
    //filtrado
    this.patientsFiltered$ = this.PatientControl.valueChanges.pipe(
      map(val => this.filterPatient(val))
    );

  }

  loadInitialData() {
    //llamada a servicios
    this.patientService.findAll().subscribe(data => this.patients = data)

  }

  filterPatient(val: any) {
    if(val?.idPatient > 0){
      //OBJECTS
      return this.patients.filter(elemento =>
        elemento.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || elemento.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || elemento.dni.includes(val))

    }
    //STRING
    return this.patients.filter(elemento =>
      elemento.firstName.toLowerCase().includes(val?.toLowerCase()) || elemento.lastName.toLowerCase().includes(val.toLowerCase()) || elemento.dni.includes(val)
    );
  }
  showPatient( val: any){
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  save() {

  }


}
