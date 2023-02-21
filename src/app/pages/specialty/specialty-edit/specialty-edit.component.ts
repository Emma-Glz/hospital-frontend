import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/Model/specialty';
import { SpecialtyService } from '../../../service/specialty.service';

@Component({
  selector: 'app-specialty-edit',
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css']
})
export class SpecialtyEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private specialtyService: SpecialtyService,
    private activedRoute: ActivatedRoute,//nos sirve para ver como se encuentra la url
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idSpecialty: new FormControl(0),
      nameSpecialty: new FormControl(''),
      descriptionSpecialty: new FormControl(''),

    });
    this.activedRoute.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();

    });

  }
  initForm(){
    if(this.isEdit){
      this.specialtyService.findById(this.id).subscribe(data=>{
        this.form = new FormGroup({
          idSpecialty: new FormControl(data.idSpecialty),
          nameSpecialty: new FormControl(data.nameSpecialty),
          descriptionSpecialty: new FormControl(data.descriptionSpecialty),
        });

      });

    }
  }

  operate(){
    const exam = new Specialty();
    exam.idSpecialty = this.form.value['idSpecialty'];
    exam.nameSpecialty = this.form.value['nameSpecialty'];
    exam.descriptionSpecialty = this.form.value['descriptionSpecialty'];
    if(this.isEdit){
    //UPDATE
    this.specialtyService.update(exam,exam.idSpecialty).subscribe(data => {
      this.specialtyService.findAll().subscribe(data => {
        //NEXT GUARDA LA DATA EN LA VARIABLE
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange("UPDATED!");
      })
    });

    }else{
      //CREATE
    this.specialtyService.save(exam).pipe(switchMap(() =>{
      return this.specialtyService.findAll();
    })
    ).subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange("CREATED!");

    })
    }

    this.router.navigate(['/pages/specialty']);

  }
}
