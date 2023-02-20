import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Specialty } from '../Model/specialty';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty> {

  private specialtyChange = new Subject<Specialty[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/specialties`);
  }

//-------------- GETTER AND SETTER-------------------------
    public getSpecialtyChange() {
      return this.specialtyChange.asObservable();
    }

    public setSpecialtyChange(data: Specialty[]) {
      this.specialtyChange.next(data);
    }

    public getMessageChange() {
      return this.messageChange.asObservable();
    }

    public setMessageChange(data: string) {
      this.messageChange.next(data);
    }

}
