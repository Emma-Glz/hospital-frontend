import { Injectable } from '@angular/core';
import { Exam } from '../Model/exam';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam> {

  private examChange = new Subject<Exam[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/exams`);
  }
  ////////////implement these change ////////////////////

  public getexamChange() {
    return this.examChange.asObservable();
  }

  public setExamChange(data: Exam[]) {
    this.examChange.next(data);
  }

  public getMessageChange() {
    return this.messageChange.asObservable();
  }

  public setMessageChange(data: string) {
    this.messageChange.next(data);
  }

}
