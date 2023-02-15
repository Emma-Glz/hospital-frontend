import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Patient } from '../Model/patient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //private url: string  = environment.HOST + '/patients';
  private url: string  = `${environment.HOST}/patients`;
  //VARIABLE QUE SIRVE PARA ALMACENAR LOS CAMBIOS
  ///////////changing method to private
  private patientChange = new Subject<Patient[]>;

  constructor(private http: HttpClient) { }

  findAll(){
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
  }

  public getPatientChange(){
    return this.patientChange.asObservable();
  }
  ////////////implement these change ////////////////////

  public setPatientChange(data: Patient[]){
    this.patientChange.next(data);
  }

}
