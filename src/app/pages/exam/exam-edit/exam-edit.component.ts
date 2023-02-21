import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/Model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private examService: ExamService,
    private activedRoute: ActivatedRoute,//nos sirve para ver como se encuentra la url
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idExam: new FormControl(0),
      nameExam: new FormControl(''),
      descriptionExam: new FormControl(''),

    });
    this.activedRoute.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();

    });

  }
  initForm(){
    if(this.isEdit){
      this.examService.findById(this.id).subscribe(data=>{
        this.form = new FormGroup({
          idExam: new FormControl(data.idExam),
          nameExam: new FormControl(data.nameExam),
          descriptionExam: new FormControl(data.descriptionExam),
        });

      });

    }
  }

  operate(){
    const exam = new Exam();
    exam.idExam = this.form.value['idExam'];
    exam.nameExam = this.form.value['nameExam'];
    exam.descriptionExam = this.form.value['descriptionExam'];
    if(this.isEdit){
    //UPDATE
    this.examService.update(exam,exam.idExam).subscribe(data => {
      this.examService.findAll().subscribe(data => {
        //NEXT GUARDA LA DATA EN LA VARIABLE
        this.examService.setExamChange(data);
        this.examService.setMessageChange("UPDATED!");
      })
    });

    }else{
      //CREATE
    this.examService.save(exam).pipe(switchMap(() =>{
      return this.examService.findAll();
    })
    ).subscribe(data => {
      this.examService.setExamChange(data);
      this.examService.setMessageChange("CREATED!");

    })
    }

    this.router.navigate(['/pages/exam']);

  }

}
