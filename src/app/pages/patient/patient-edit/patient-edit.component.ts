import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../service/patient.service';
import { Patient } from '../../../Model/patient';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private service: PatientService,
    private activedRoute: ActivatedRoute,//nos sirve para ver como se encuentra la url
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dni: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });
    this.activedRoute.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();

    });

  }
  initForm(){
    if(this.isEdit){
      this.service.findById(this.id).subscribe(data=>{
        this.form = new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          dni: new FormControl(data.dni),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone),
          email: new FormControl(data.email)
        });

      });

    }
  }

  operate(){
    const patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];

    if(this.isEdit){
    //UPDATE
    this.service.update(patient).subscribe(data => {
      this.service.findAll().subscribe(data => {
        //NEXT GUARDA LA DATA EN LA VARIABLE
        this.service.patientChange.next(data);
      })
    });

    }else{
      //CREATE
    this.service.save(patient).pipe(switchMap(() =>{
      return this.service.findAll();
    })
    ).subscribe(data => {
      return this.service.patientChange.next(data);
    })
    }
    this.router.navigate(['/pages/patient']);
  }
}
