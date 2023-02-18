import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Patient } from '../Model/patient';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient> {

  //private url: string  = environment.HOST + '/patients';
  //private url: string  = `${environment.HOST}/patients`;
  //VARIABLE QUE SIRVE PARA ALMACENAR LOS CAMBIOS
  ///////////changing method to private
  private patientChange = new Subject<Patient[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/patients`);
  }

 /* findAll(){
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient){
    return this.http.post(this.url,patient);
  }

  update(patient: Patient){
    return this.http.put(`${this.url}/${patient.idPatient}`,patient);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/
  ////////////implement these change ////////////////////

  public getPatientChange(){
    return this.patientChange.asObservable();
  }

  public setPatientChange(data: Patient[]){
    this.patientChange.next(data);
  }

  public getMessageChange(){
    return this.messageChange.asObservable();
  }

  public setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
