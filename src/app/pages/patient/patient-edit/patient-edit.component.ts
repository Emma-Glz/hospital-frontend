import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      firstName: new FormControl('',[Validators.required, Validators.minLength(150)]),
      lastName: new FormControl('',[Validators.required , Validators.minLength(70)]),
      dni: new FormControl('',[Validators.required , Validators.minLength(8)]),
      address: new FormControl(''),
      phone: new FormControl('',[Validators.required , Validators.minLength(10)]),
      email: new FormControl('',[Validators.required , Validators.email])
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
          firstName: new FormControl(data.firstName,[Validators.required , Validators.minLength(150)]),
          lastName: new FormControl(data.lastName,[Validators.required , Validators.minLength(70)]),
          dni: new FormControl(data.dni,[Validators.required , Validators.minLength(8)]),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone,[Validators.required , Validators.minLength(10)]),
          email: new FormControl(data.email,[Validators.required , Validators.email])
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
    this.service.update(patient,patient.idPatient).subscribe(data => {
      this.service.findAll().subscribe(data => {
        //NEXT GUARDA LA DATA EN LA VARIABLE
        this.service.setPatientChange(data);
        this.service.setMessageChange("UPDATED!");
      })
    });

    }else{
      //CREATE
    this.service.save(patient).pipe(switchMap(() =>{
      return this.service.findAll();
    })
    ).subscribe(data => {
      this.service.setPatientChange(data);
      this.service.setMessageChange("CREATED!");

    })
    }

    this.router.navigate(['/pages/patient']);
  }
  get f(){
    console.log(this.form.controls)
    return this.form.controls;
  }
}
